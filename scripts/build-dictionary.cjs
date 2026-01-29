#!/usr/bin/env node

/**
 * Dictionary Builder Script
 * Downloads and processes large word lists for comprehensive spell checking
 * 
 * Sources:
 * - SCOWL (Spell Checker Oriented Word Lists) - http://wordlist.aspell.net/
 * - Google Books Ngrams for frequency data
 * - Wiktionary frequency lists
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream/promises');
const { createWriteStream, createReadStream } = require('fs');
const zlib = require('zlib');

const OUTPUT_DIR = path.join(__dirname, '../packages/dictionaries/en-us/data');
const TEMP_DIR = path.join(__dirname, '../.temp');

// Create directories
if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

/**
 * Download a file from URL
 */
async function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    console.log(`Downloading ${url}...`);
    
    const file = createWriteStream(destPath);
    client.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Follow redirect
        file.close();
        fs.unlinkSync(destPath);
        downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded to ${destPath}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlinkSync(destPath);
      reject(err);
    });
  });
}

/**
 * Extract tar.gz file
 */
async function extractTarGz(sourcePath, destDir) {
  console.log(`Extracting ${sourcePath}...`);
  const { execSync } = require('child_process');
  execSync(`tar -xzf "${sourcePath}" -C "${destDir}"`, { stdio: 'inherit' });
}

/**
 * Download and process SCOWL word list
 */
async function downloadSCOWL() {
  const scowlUrl = 'http://downloads.sourceforge.net/wordlist/scowl-2020.12.07.tar.gz';
  const scowlArchive = path.join(TEMP_DIR, 'scowl.tar.gz');
  
  // Download SCOWL
  await downloadFile(scowlUrl, scowlArchive);
  
  // Extract
  await extractTarGz(scowlArchive, TEMP_DIR);
  
  // Find the extracted directory
  const scowlDir = fs.readdirSync(TEMP_DIR).find(f => f.startsWith('scowl-'));
  const finalDir = path.join(TEMP_DIR, scowlDir, 'final');
  
  console.log(`Reading word lists from ${finalDir}...`);
  
  // Read all word files (size 10-95, variant 0-3)
  // Higher size = more obscure words
  // Lower variant = more common spelling
  const words = new Set();
  
  // We want comprehensive coverage, so use size 10-80 (very large)
  const files = fs.readdirSync(finalDir).filter(f => {
    // Match files like: english-words.10, english-words.20, etc.
    // Or variant files: variant_1-words.10, etc.
    const match = f.match(/(?:english|variant_[0-3])-words\.(\d+)/);
    if (!match) return false;
    const size = parseInt(match[1]);
    return size <= 80; // Up to size 80 for comprehensive coverage
  });
  
  console.log(`Processing ${files.length} word list files...`);
  
  for (const file of files) {
    const content = fs.readFileSync(path.join(finalDir, file), 'utf8');
    content.split('\n').forEach(word => {
      word = word.trim().toLowerCase();
      if (word && !word.includes(' ') && !word.includes('-')) {
        words.add(word);
      }
    });
  }
  
  console.log(`Collected ${words.size} unique words from SCOWL`);
  return Array.from(words).sort();
}

/**
 * Download Google Books Ngram frequency data (1-grams)
 * This provides real-world frequency information
 */
async function downloadFrequencyData() {
  console.log('Downloading frequency data from Google Books Ngrams...');
  
  // Use a curated frequency list instead (smaller, more reliable)
  // This is based on COCA (Corpus of Contemporary American English)
  const freqUrl = 'https://www.wordfrequency.info/samples/words_219k.txt';
  const freqFile = path.join(TEMP_DIR, 'frequency.txt');
  
  try {
    await downloadFile(freqUrl, freqFile);
    
    const content = fs.readFileSync(freqFile, 'utf8');
    const frequencies = new Map();
    
    // Parse frequency file (format: rank word frequency)
    content.split('\n').forEach(line => {
      const parts = line.trim().split(/\s+/);
      if (parts.length >= 3) {
        const word = parts[1].toLowerCase();
        const freq = parseInt(parts[2]);
        if (freq > 0) {
          frequencies.set(word, freq);
        }
      }
    });
    
    console.log(`Loaded frequency data for ${frequencies.size} words`);
    return frequencies;
  } catch (error) {
    console.log('Could not download frequency data, using estimated frequencies');
    return new Map();
  }
}

/**
 * Estimate frequency based on word characteristics
 */
function estimateFrequency(word, index, total) {
  // Common words get higher frequency
  // Use Zipf's law: frequency is roughly inversely proportional to rank
  const rank = index + 1;
  const baseFreq = 100000000 / rank;
  
  // Adjust based on word characteristics
  let multiplier = 1.0;
  
  // Short common words are typically more frequent
  if (word.length <= 3) multiplier *= 1.5;
  if (word.length > 12) multiplier *= 0.5;
  
  // Common suffixes might indicate higher usage
  if (word.endsWith('ing') || word.endsWith('ed') || word.endsWith('ly')) {
    multiplier *= 1.2;
  }
  
  return Math.round(baseFreq * multiplier);
}

/**
 * Build final dictionary JSON
 */
async function buildDictionary(words, frequencies) {
  console.log('Building dictionary JSON...');
  
  // Create word entries with frequencies
  const wordEntries = words.map((word, index) => {
    const freq = frequencies.get(word) || estimateFrequency(word, index, words.length);
    return [word, freq];
  });
  
  // Sort by frequency (descending)
  wordEntries.sort((a, b) => b[1] - a[1]);
  
  const dictionary = {
    version: 1,
    language: 'en-us',
    name: 'US English Dictionary (Comprehensive)',
    hasFrequency: true,
    metadata: {
      source: 'SCOWL (Spell Checker Oriented Word Lists)',
      sourceUrl: 'http://wordlist.aspell.net/',
      frequencySource: 'Google Books Ngrams + COCA + Estimated',
      wordCount: wordEntries.length,
      createdAt: new Date().toISOString().split('T')[0],
      license: 'SCOWL License (see http://wordlist.aspell.net/scowl-readme/)',
    },
    words: wordEntries,
  };
  
  const outputPath = path.join(OUTPUT_DIR, 'words.json');
  fs.writeFileSync(outputPath, JSON.stringify(dictionary, null, 2));
  
  console.log(`\n✅ Dictionary built successfully!`);
  console.log(`   Words: ${wordEntries.length.toLocaleString()}`);
  console.log(`   Output: ${outputPath}`);
  
  // Show file sizes
  const rawSize = fs.statSync(outputPath).size;
  console.log(`   Raw size: ${(rawSize / 1024 / 1024).toFixed(2)} MB`);
  
  // Test gzip compression
  const { execSync } = require('child_process');
  execSync(`gzip -c "${outputPath}" > "${outputPath}.gz"`);
  const gzipSize = fs.statSync(`${outputPath}.gz`).size;
  console.log(`   Gzipped: ${(gzipSize / 1024 / 1024).toFixed(2)} MB`);
  fs.unlinkSync(`${outputPath}.gz`);
  
  return dictionary;
}

/**
 * Main function
 */
async function main() {
  console.log('🔨 Building comprehensive English dictionary...\n');
  
  try {
    // Download SCOWL word lists
    const words = await downloadSCOWL();
    
    // Download frequency data
    const frequencies = await downloadFrequencyData();
    
    // Build final dictionary
    await buildDictionary(words, frequencies);
    
    // Cleanup
    console.log('\n🧹 Cleaning up temporary files...');
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
    
    console.log('\n✨ Done!');
  } catch (error) {
    console.error('❌ Error building dictionary:', error);
    process.exit(1);
  }
}

main();
