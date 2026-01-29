#!/usr/bin/env npx ts-node

/**
 * Script to fix broken regex patterns in imported rules
 *
 * This fixes the common issue of double-escaped backslashes in regex literals
 * e.g., /\\bword\\b/ should be /\bword\b/
 *
 * Usage: npx ts-node scripts/fix-broken-rules.ts [--dry-run]
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RULES_DIR = path.join(__dirname, '../packages/core/src/rules/imported');
const DRY_RUN = process.argv.includes('--dry-run');

interface FixResult {
  file: string;
  fixesApplied: number;
  changes: string[];
}

function getAllRuleFiles(dir: string): string[] {
  const files: string[] = [];

  function walk(currentDir: string) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith('.ts') && !entry.name.endsWith('.test.ts')) {
        files.push(fullPath);
      }
    }
  }

  walk(dir);
  return files;
}

function fixDoubleEscapedBackslashes(content: string): {
  fixed: string;
  count: number;
  changes: string[];
} {
  let fixCount = 0;
  const changes: string[] = [];

  // Fix double-escaped backslashes in regex literals
  // Match: pattern: /\\bword\\s+stuff\\b/gi
  // Should be: pattern: /\bword\s+stuff\b/gi

  const fixed = content.replace(
    /(pattern[:\s]*=?\s*)(\/)((?:[^\/]|\\\/)+)(\/[gimsuvy]*)/g,
    (match, prefix, openSlash, body, flags) => {
      // Check if body has double-escaped backslashes
      if (body.includes('\\\\')) {
        const originalBody = body;
        // Replace \\b with \b, \\s with \s, \\d with \d, etc.
        // But be careful not to break actual escaped backslashes meant to match literal backslash
        const fixedBody = body
          .replace(/\\\\b/g, '\\b') // word boundary
          .replace(/\\\\B/g, '\\B') // non-word boundary
          .replace(/\\\\s/g, '\\s') // whitespace
          .replace(/\\\\S/g, '\\S') // non-whitespace
          .replace(/\\\\d/g, '\\d') // digit
          .replace(/\\\\D/g, '\\D') // non-digit
          .replace(/\\\\w/g, '\\w') // word character
          .replace(/\\\\W/g, '\\W') // non-word character
          .replace(/\\\\n/g, '\\n') // newline
          .replace(/\\\\r/g, '\\r') // carriage return
          .replace(/\\\\t/g, '\\t') // tab
          .replace(/\\\\./g, '\\.') // literal dot
          .replace(/\\\\\+/g, '\\+') // literal plus
          .replace(/\\\\\*/g, '\\*') // literal star
          .replace(/\\\\\?/g, '\\?') // literal question mark
          .replace(/\\\\\(/g, '\\(') // literal open paren
          .replace(/\\\\\)/g, '\\)') // literal close paren
          .replace(/\\\\\[/g, '\\[') // literal open bracket
          .replace(/\\\\\]/g, '\\]') // literal close bracket
          .replace(/\\\\\{/g, '\\{') // literal open brace
          .replace(/\\\\\}/g, '\\}') // literal close brace
          .replace(/\\\\\|/g, '\\|') // literal pipe
          .replace(/\\\\\^/g, '\\^') // literal caret
          .replace(/\\\\\$/g, '\\$'); // literal dollar

        if (fixedBody !== originalBody) {
          fixCount++;
          changes.push(`  ${openSlash}${originalBody}${flags} → ${openSlash}${fixedBody}${flags}`);
          return prefix + openSlash + fixedBody + flags;
        }
      }
      return match;
    }
  );

  return { fixed, count: fixCount, changes };
}

function fixFile(filePath: string): FixResult {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { fixed, count, changes } = fixDoubleEscapedBackslashes(content);

  if (count > 0 && !DRY_RUN) {
    fs.writeFileSync(filePath, fixed, 'utf-8');
  }

  return {
    file: filePath,
    fixesApplied: count,
    changes,
  };
}

function main() {
  console.log('🔧 Fixing broken regex patterns in imported rules...');
  if (DRY_RUN) {
    console.log('   (DRY RUN - no files will be modified)\n');
  } else {
    console.log();
  }

  const files = getAllRuleFiles(RULES_DIR);
  console.log(`Found ${files.length} rule files to process.\n`);

  let totalFixes = 0;
  let filesFixed = 0;
  const results: FixResult[] = [];

  for (const file of files) {
    const result = fixFile(file);
    if (result.fixesApplied > 0) {
      results.push(result);
      totalFixes += result.fixesApplied;
      filesFixed++;
    }
  }

  console.log('═'.repeat(80));
  console.log('FIX RESULTS');
  console.log('═'.repeat(80));

  if (results.length > 0) {
    // Show first 20 files with changes
    const displayResults = results.slice(0, 20);
    for (const result of displayResults) {
      const relPath = path.relative(process.cwd(), result.file);
      console.log(`\n📝 ${relPath} (${result.fixesApplied} fixes)`);
      for (const change of result.changes.slice(0, 3)) {
        console.log(change);
      }
      if (result.changes.length > 3) {
        console.log(`  ... and ${result.changes.length - 3} more`);
      }
    }

    if (results.length > 20) {
      console.log(`\n... and ${results.length - 20} more files`);
    }
  }

  console.log('\n' + '═'.repeat(80));
  console.log(`\nSummary:`);
  console.log(`  Files scanned: ${files.length}`);
  console.log(`  Files ${DRY_RUN ? 'that would be fixed' : 'fixed'}: ${filesFixed}`);
  console.log(`  Total regex patterns ${DRY_RUN ? 'to fix' : 'fixed'}: ${totalFixes}`);

  if (DRY_RUN && totalFixes > 0) {
    console.log('\n💡 Run without --dry-run to apply fixes.');
  } else if (totalFixes > 0) {
    console.log('\n✅ All fixes applied! Run the scanner again to verify.');
  } else {
    console.log('\n✅ No fixes needed!');
  }
}

main();
