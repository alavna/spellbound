#!/usr/bin/env npx ts-node

/**
 * Script to scan imported rules for broken/suspicious regex patterns
 *
 * Usage: npx ts-node scripts/scan-broken-rules.ts [--fix]
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface RuleIssue {
  file: string;
  ruleId: string;
  issue: string;
  severity: 'error' | 'warning' | 'info';
  pattern?: string;
  suggestion?: string;
}

const RULES_DIR = path.join(__dirname, '../packages/core/src/rules/imported');

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

function extractPatterns(
  content: string
): Array<{ pattern: string; line: number; context: string }> {
  const patterns: Array<{ pattern: string; line: number; context: string }> = [];
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Match regex literals: pattern: /.../ or pattern = /.../
    const regexLiteralMatch = line.match(/pattern[:\s]*=?\s*(\/[^\/]+\/[gimsuvy]*)/);
    if (regexLiteralMatch) {
      patterns.push({
        pattern: regexLiteralMatch[1],
        line: i + 1,
        context: lines.slice(Math.max(0, i - 2), i + 3).join('\n'),
      });
    }

    // Match new RegExp(...) patterns
    const regExpMatch = line.match(/new\s+RegExp\s*\(\s*['"`]([^'"`]+)['"`]/);
    if (regExpMatch) {
      patterns.push({
        pattern: `RegExp("${regExpMatch[1]}")`,
        line: i + 1,
        context: lines.slice(Math.max(0, i - 2), i + 3).join('\n'),
      });
    }
  }

  return patterns;
}

function extractRuleId(content: string): string {
  const idMatch = content.match(/id:\s*['"`]([^'"`]+)['"`]/);
  return idMatch ? idMatch[1] : 'unknown';
}

function isRuleDisabled(content: string): boolean {
  // Check if enabled: false is set
  return /enabled:\s*false/.test(content);
}

function analyzePattern(pattern: string, ruleId: string, file: string): RuleIssue[] {
  const issues: RuleIssue[] = [];
  const fileName = path.basename(file, '.ts');

  // Issue 1: Double-escaped backslashes in regex literals (common import error)
  // e.g., /\\bword\\b/ instead of /\bword\b/
  if (pattern.startsWith('/') && pattern.includes('\\\\')) {
    issues.push({
      file,
      ruleId,
      issue: 'Double-escaped backslashes in regex literal (should be single)',
      severity: 'error',
      pattern,
      suggestion: pattern.replace(/\\\\/g, '\\'),
    });
  }

  // Issue 2: Pattern doesn't seem to match the rule purpose
  // Extract key words from rule ID and check if pattern contains them
  const ruleKeywords = ruleId
    .toLowerCase()
    .split(/[-_]/)
    .filter((w) => w.length > 2);
  const fileKeywords = fileName
    .toLowerCase()
    .split(/[-_]/)
    .filter((w) => w.length > 2);
  const allKeywords = [...new Set([...ruleKeywords, ...fileKeywords])];

  // Check if pattern contains ANY of the keywords (very basic heuristic)
  const patternLower = pattern.toLowerCase();
  const hasRelevantKeyword = allKeywords.some((keyword) => {
    // Skip common words
    if (['rule', 'check', 'grammar', 'style', 'the', 'and', 'for'].includes(keyword)) {
      return true;
    }
    return patternLower.includes(keyword);
  });

  // Issue 3: Pattern looks like it matches ONLY common articles instead of the target
  // This catches the bug we found where "too" rule was matching "the|an?"
  // But skip if the rule is about articles, or if it's a confusion rule (those intentionally match)
  const articleOnlyPattern = /^\/\\?b?(the|an?\??)\|?(an?\??|the)?\\?b?\/?[gimsuvy]*$/i;
  if (
    articleOnlyPattern.test(pattern) &&
    !ruleId.includes('article') &&
    !ruleId.includes('confusion')
  ) {
    issues.push({
      file,
      ruleId,
      issue: 'Pattern ONLY matches articles (the/a/an) - likely a broken import',
      severity: 'error',
      pattern,
    });
  }

  // Issue 4: Very short or trivial patterns
  const patternBody = pattern.replace(/^\/|\/[gimsuvy]*$/g, '');
  if (patternBody.length < 3 && !patternBody.includes('\\')) {
    issues.push({
      file,
      ruleId,
      issue: 'Pattern is suspiciously short',
      severity: 'warning',
      pattern,
    });
  }

  // Issue 5: Pattern has unbalanced parentheses
  const openParens = (patternBody.match(/\(/g) || []).length;
  const closeParens = (patternBody.match(/\)/g) || []).length;
  if (openParens !== closeParens) {
    issues.push({
      file,
      ruleId,
      issue: 'Pattern has unbalanced parentheses',
      severity: 'error',
      pattern,
    });
  }

  // Issue 6: Pattern has unbalanced brackets
  const openBrackets = (patternBody.match(/\[/g) || []).length;
  const closeBrackets = (patternBody.match(/\]/g) || []).length;
  if (openBrackets !== closeBrackets) {
    issues.push({
      file,
      ruleId,
      issue: 'Pattern has unbalanced brackets',
      severity: 'error',
      pattern,
    });
  }

  // Issue 7: Empty alternation (||)
  if (patternBody.includes('||')) {
    issues.push({
      file,
      ruleId,
      issue: 'Pattern contains empty alternation (||)',
      severity: 'error',
      pattern,
    });
  }

  // Issue 8: Try to compile the regex and catch errors
  if (pattern.startsWith('/')) {
    try {
      const flagsMatch = pattern.match(/\/([gimsuvy]*)$/);
      const flags = flagsMatch ? flagsMatch[1] : '';
      const body = pattern.slice(1, pattern.lastIndexOf('/'));
      new RegExp(body, flags);
    } catch (e: any) {
      issues.push({
        file,
        ruleId,
        issue: `Invalid regex: ${e.message}`,
        severity: 'error',
        pattern,
      });
    }
  }

  return issues;
}

function scanFile(filePath: string): RuleIssue[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const ruleId = extractRuleId(content);
  const patterns = extractPatterns(content);
  const disabled = isRuleDisabled(content);

  // Skip disabled rules - they're already handled
  if (disabled) {
    return [];
  }

  const issues: RuleIssue[] = [];

  for (const { pattern, line, context } of patterns) {
    const patternIssues = analyzePattern(pattern, ruleId, filePath);
    for (const issue of patternIssues) {
      issue.issue = `Line ${line}: ${issue.issue}`;
    }
    issues.push(...patternIssues);
  }

  // Check for rules with no patterns at all
  if (patterns.length === 0 && content.includes('check(')) {
    // Only flag if it has a check function but no patterns
    // (some rules might use different detection methods)
  }

  return issues;
}

function main() {
  console.log('🔍 Scanning imported rules for broken patterns...\n');

  const files = getAllRuleFiles(RULES_DIR);
  console.log(`Found ${files.length} rule files to scan.\n`);

  const allIssues: RuleIssue[] = [];

  for (const file of files) {
    const issues = scanFile(file);
    allIssues.push(...issues);
  }

  // Group by severity
  const errors = allIssues.filter((i) => i.severity === 'error');
  const warnings = allIssues.filter((i) => i.severity === 'warning');
  const infos = allIssues.filter((i) => i.severity === 'info');

  console.log('═'.repeat(80));
  console.log('SCAN RESULTS');
  console.log('═'.repeat(80));

  if (errors.length > 0) {
    console.log(`\n🔴 ERRORS (${errors.length}):\n`);
    for (const issue of errors) {
      const relPath = path.relative(process.cwd(), issue.file);
      console.log(`  ${relPath}`);
      console.log(`    Rule: ${issue.ruleId}`);
      console.log(`    ${issue.issue}`);
      if (issue.pattern) {
        console.log(`    Pattern: ${issue.pattern}`);
      }
      if (issue.suggestion) {
        console.log(`    Suggestion: ${issue.suggestion}`);
      }
      console.log();
    }
  }

  if (warnings.length > 0) {
    console.log(`\n🟡 WARNINGS (${warnings.length}):\n`);
    for (const issue of warnings) {
      const relPath = path.relative(process.cwd(), issue.file);
      console.log(`  ${relPath}`);
      console.log(`    Rule: ${issue.ruleId}`);
      console.log(`    ${issue.issue}`);
      if (issue.pattern) {
        console.log(`    Pattern: ${issue.pattern}`);
      }
      console.log();
    }
  }

  console.log('═'.repeat(80));
  console.log(
    `\nSummary: ${errors.length} errors, ${warnings.length} warnings, ${infos.length} info`
  );
  console.log(`Scanned ${files.length} files.`);

  if (errors.length > 0) {
    console.log('\n⚠️  Found broken rules that need manual review!');
    process.exit(1);
  } else {
    console.log('\n✅ No critical issues found.');
  }
}

main();
