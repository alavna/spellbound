#!/usr/bin/env node

/**
 * Confusion Sets Converter
 * Converts LanguageTool's confusion_sets.txt to Spellbound grammar rules
 * These are commonly confused word pairs like affect/effect, their/there, etc.
 */

const fs = require('fs');
const path = require('path');

const LT_BASE = path.join(
  __dirname,
  '../.temp/languagetool/languagetool-language-modules/en/src/main/resources/org/languagetool/resource/en'
);
const OUTPUT_DIR = path.join(__dirname, '../packages/core/src/rules/imported/confusion');

// Descriptions for common confused pairs (for better error messages)
const WORD_DESCRIPTIONS = {
  accept: 'to receive or agree to',
  except: 'excluding or other than',
  affect: 'to influence (verb)',
  effect: 'a result (noun) or to cause (verb)',
  their: 'belonging to them',
  there: 'in that place',
  "they're": 'contraction of "they are"',
  your: 'belonging to you',
  "you're": 'contraction of "you are"',
  its: 'belonging to it',
  "it's": 'contraction of "it is" or "it has"',
  to: 'preposition indicating direction',
  too: 'also or excessively',
  two: 'the number 2',
  then: 'at that time or next',
  than: 'used for comparison',
  loose: 'not tight (adjective)',
  lose: 'to misplace or fail to win (verb)',
  whose: 'belonging to whom',
  "who's": 'contraction of "who is"',
  advice: 'guidance (noun)',
  advise: 'to give guidance (verb)',
  principal: 'main or head of school',
  principle: 'a fundamental truth or rule',
  stationary: 'not moving',
  stationery: 'writing materials',
  complement: 'to complete or enhance',
  compliment: 'praise or flattery',
  discrete: 'separate or distinct',
  discreet: 'careful or prudent',
  emigrate: 'to leave a country',
  immigrate: 'to enter a country',
  farther: 'physical distance',
  further: 'additional or more',
  lay: 'to put down (transitive verb)',
  lie: 'to recline (intransitive verb)',
  breath: 'air inhaled (noun)',
  breathe: 'to inhale air (verb)',
  capital: 'city or uppercase letter',
  capitol: 'government building',
  cite: 'to quote or reference',
  site: 'location',
  sight: 'vision or view',
  peace: 'absence of war',
  piece: 'a part of something',
  lead: 'to guide (verb) or a metal (noun)',
  led: 'past tense of lead',
  passed: 'went by (verb)',
  past: 'previous time (noun/adj/prep)',
  desert: 'dry land or to abandon',
  dessert: 'sweet course after a meal',
  weather: 'atmospheric conditions',
  whether: 'if (conjunction)',
  allowed: 'permitted',
  aloud: 'audibly, with sound',
  bare: 'uncovered',
  bear: 'animal or to carry',
  board: 'flat piece of wood',
  bored: 'uninterested',
  break: 'to shatter or pause',
  brake: 'device to stop movement',
  coarse: 'rough texture',
  course: 'path or class',
  die: 'to cease living',
  dye: 'to color',
  fair: 'just or carnival',
  fare: 'price of travel',
  flour: 'ground wheat',
  flower: 'plant bloom',
  hear: 'to perceive sound',
  here: 'in this place',
  hole: 'opening',
  whole: 'entire',
  hour: 'sixty minutes',
  our: 'belonging to us',
  know: 'to understand',
  no: 'negative',
  knew: 'past tense of know',
  new: 'not old',
  mail: 'postal delivery',
  male: 'masculine',
  meat: 'animal flesh',
  meet: 'to encounter',
  pair: 'two items',
  pear: 'fruit',
  pale: 'light colored',
  pail: 'bucket',
  plain: 'simple or flat land',
  plane: 'aircraft or flat surface',
  rain: 'precipitation',
  reign: 'to rule',
  rein: 'strap to guide horse',
  right: 'correct or direction',
  write: 'to put words on paper',
  road: 'path for travel',
  rode: 'past tense of ride',
  role: 'part played',
  roll: 'to turn over',
  sail: 'to travel by water',
  sale: 'exchange for money',
  sea: 'body of water',
  see: 'to perceive with eyes',
  son: 'male child',
  sun: 'star',
  stair: 'step',
  stare: 'to look fixedly',
  steal: 'to take without permission',
  steel: 'metal alloy',
  tail: 'rear appendage',
  tale: 'story',
  waist: 'midsection',
  waste: 'unused material',
  wait: 'to stay',
  weight: 'heaviness',
  weak: 'not strong',
  week: 'seven days',
  wear: 'to have on body',
  where: 'at what place',
  wood: 'tree material',
  would: 'conditional verb',
};

function sanitizeId(str) {
  return str
    .replace(/[^a-zA-Z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parseConfusionLine(line) {
  // Remove comments
  const commentIdx = line.indexOf('#');
  let data = commentIdx >= 0 ? line.substring(0, commentIdx).trim() : line.trim();

  if (!data || data.startsWith('#')) return null;

  // Handle arrow format: word1 -> word2; factor;
  const arrowMatch = data.match(/^([^;->]+)\s*->\s*([^;->]+)\s*;\s*(\d+)\s*;?/);
  if (arrowMatch) {
    return {
      word1: arrowMatch[1].trim(),
      word2: arrowMatch[2].trim(),
      factor: parseInt(arrowMatch[3], 10),
      directional: true,
    };
  }

  // Handle semicolon format: word1; word2; factor
  const semiMatch = data.match(/^([^;]+)\s*;\s*([^;]+)\s*;\s*(\d+)/);
  if (semiMatch) {
    return {
      word1: semiMatch[1].trim(),
      word2: semiMatch[2].trim(),
      factor: parseInt(semiMatch[3], 10),
      directional: false,
    };
  }

  // Handle simple semicolon format: word1;word2;factor
  const simpleMatch = data.match(/^(\S+);(\S+);(\d+)/);
  if (simpleMatch) {
    return {
      word1: simpleMatch[1].trim(),
      word2: simpleMatch[2].trim(),
      factor: parseInt(simpleMatch[3], 10),
      directional: false,
    };
  }

  return null;
}

function createConfusionRule(pair, index) {
  const { word1, word2, directional } = pair;

  const id = `confusion_${sanitizeId(word1)}_${sanitizeId(word2)}_${index}`;

  const desc1 = WORD_DESCRIPTIONS[word1.toLowerCase()] || `"${word1}"`;
  const desc2 = WORD_DESCRIPTIONS[word2.toLowerCase()] || `"${word2}"`;

  let message, suggestion;

  if (directional) {
    // word1 -> word2 means word1 is often incorrectly used when word2 is meant
    message = `Did you mean "${word2}"? "${word1}" (${desc1}) is often confused with "${word2}" (${desc2}).`;
    suggestion = word2;
  } else {
    // Bidirectional - could be either
    message = `Check: "${word1}" (${desc1}) vs "${word2}" (${desc2}). These words are often confused.`;
    suggestion = word2;
  }

  // Create a regex pattern that matches the word (case-insensitive with word boundaries)
  const pattern = `\\\\b${escapeRegex(word1)}\\\\b`;

  return `
  {
    id: '${id}',
    name: '${word1} vs ${word2}',
    description: 'Commonly confused words: ${word1} and ${word2}',
    category: 'confusion',
    severity: 'warning' as const,
    pattern: /${pattern}/gi,
    message: '${message.replace(/'/g, "\\'")}',
    suggestions: (match: RegExpMatchArray) => {
      // Preserve case
      const orig = match[0];
      let replacement = '${suggestion}';
      if (orig[0] === orig[0].toUpperCase()) {
        replacement = replacement[0].toUpperCase() + replacement.slice(1);
      }
      if (orig === orig.toUpperCase()) {
        replacement = replacement.toUpperCase();
      }
      return [replacement];
    },
  }`;
}

async function processConfusionSets() {
  console.log('📖 Processing LanguageTool confusion sets...\n');

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const files = [
    'confusion_sets.txt',
    // Extended set has many more pairs
    'confusion_sets_extended.txt',
  ];

  const allPairs = [];
  const seenPairs = new Set();

  for (const filename of files) {
    const filepath = path.join(LT_BASE, filename);

    if (!fs.existsSync(filepath)) {
      console.log(`⚠️  File not found: ${filename}`);
      continue;
    }

    console.log(`📄 Processing ${filename}...`);

    const content = fs.readFileSync(filepath, 'utf8');
    const lines = content.split('\n');

    let count = 0;
    for (const line of lines) {
      const pair = parseConfusionLine(line);
      if (pair) {
        // Create unique key to avoid duplicates
        const key = [pair.word1.toLowerCase(), pair.word2.toLowerCase()].sort().join('|');
        const dirKey = `${pair.word1.toLowerCase()}->${pair.word2.toLowerCase()}`;

        // For directional pairs, use direction as key
        const pairKey = pair.directional ? dirKey : key;

        if (!seenPairs.has(pairKey)) {
          seenPairs.add(pairKey);
          allPairs.push(pair);
          count++;
        }
      }
    }

    console.log(`   Found ${count} unique pairs`);
  }

  console.log(`\n📊 Total unique confusion pairs: ${allPairs.length}`);

  // Group by first letter for manageable file sizes
  const grouped = {};
  for (let i = 0; i < allPairs.length; i++) {
    const pair = allPairs[i];
    const firstLetter = pair.word1[0].toLowerCase();
    const group = firstLetter.match(/[a-z]/) ? firstLetter : 'other';

    if (!grouped[group]) {
      grouped[group] = [];
    }
    grouped[group].push({ pair, index: i });
  }

  // Generate files
  const generatedFiles = [];

  for (const [letter, pairs] of Object.entries(grouped)) {
    const filename = `confusion-${letter}.ts`;
    const filepath = path.join(OUTPUT_DIR, filename);

    const rules = pairs.map(({ pair, index }) => createConfusionRule(pair, index));

    const content = `/**
 * Auto-generated confusion rules (${letter.toUpperCase()})
 * Source: LanguageTool confusion_sets.txt
 * Generated: ${new Date().toISOString()}
 * 
 * These rules detect commonly confused word pairs like:
 * - affect/effect
 * - their/there/they're
 * - accept/except
 * etc.
 * 
 * DO NOT EDIT - Generated by convert-confusion-sets.cjs
 */

import type { GrammarRule } from '../../../types';

export const confusionRules${letter.toUpperCase()}: GrammarRule[] = [${rules.join(',')}
];
`;

    fs.writeFileSync(filepath, content);
    generatedFiles.push({ letter, count: pairs.length, filename });
    console.log(`   ✅ ${filename}: ${pairs.length} rules`);
  }

  // Generate index file
  const indexContent = `/**
 * Auto-generated index for confusion rules
 * Source: LanguageTool confusion_sets.txt
 * Generated: ${new Date().toISOString()}
 * 
 * Total rules: ${allPairs.length}
 */

${generatedFiles.map((f) => `import { confusionRules${f.letter.toUpperCase()} } from './confusion-${f.letter}';`).join('\n')}

import type { GrammarRule } from '../../../types';

export const confusionRules: GrammarRule[] = [
${generatedFiles.map((f) => `  ...confusionRules${f.letter.toUpperCase()},`).join('\n')}
];

export const confusionRuleCount = ${allPairs.length};
`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.ts'), indexContent);

  console.log(
    `\n✅ Generated ${generatedFiles.length} files with ${allPairs.length} confusion rules`
  );
  console.log(`📁 Output: ${OUTPUT_DIR}`);

  return allPairs.length;
}

// Run
processConfusionSets().catch(console.error);
