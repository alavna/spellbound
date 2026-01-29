#!/usr/bin/env node

/**
 * LanguageTool Rule Converter v2
 *
 * Uses regex-based extraction to bypass XML entity issues
 * Converts LanguageTool rules to Spellbound format
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../packages/core/src/rules/imported');

/**
 * Extract all rules from XML content using regex
 */
function extractRulesFromXML(xmlContent, filename) {
  const rules = [];

  // Match rule blocks: <rule id="..." name="...">...</rule>
  // Also match rulegroup blocks which contain multiple rules
  const ruleRegex = /<rule\s+id="([^"]+)"[^>]*name="([^"]*)"[^>]*>([\s\S]*?)<\/rule>/g;

  let match;
  while ((match = ruleRegex.exec(xmlContent)) !== null) {
    const id = match[1];
    const name = match[2];
    const content = match[3];

    // Extract pattern tokens
    const patternMatch = content.match(/<pattern[^>]*>([\s\S]*?)<\/pattern>/);
    if (!patternMatch) continue;

    const patternContent = patternMatch[1];

    // Extract tokens from pattern
    const tokens = extractTokens(patternContent);
    if (tokens.length === 0) continue;

    // Extract message
    const messageMatch = content.match(/<message[^>]*>([\s\S]*?)<\/message>/);
    const message = messageMatch ? cleanText(messageMatch[1]) : '';

    // Extract suggestions
    const suggestions = [];
    const suggestionRegex = /<suggestion[^>]*>([\s\S]*?)<\/suggestion>/g;
    let suggMatch;
    while ((suggMatch = suggestionRegex.exec(content)) !== null) {
      const sugg = cleanText(suggMatch[1]);
      if (sugg && !sugg.includes('<match')) {
        suggestions.push(sugg);
      }
    }

    // Extract examples
    const examples = [];
    const exampleRegex = /<example[^>]*correction="([^"]*)"[^>]*>([\s\S]*?)<\/example>/g;
    let exMatch;
    while ((exMatch = exampleRegex.exec(content)) !== null) {
      const correction = exMatch[1];
      const exampleText = cleanText(exMatch[2].replace(/<\/?marker>/g, ''));
      examples.push({ incorrect: exampleText, correct: correction });
    }

    // Determine category from filename
    let category = 'grammar';
    if (filename.includes('style')) category = 'style';
    else if (filename.includes('coherency')) category = 'coherency';

    rules.push({
      id: normalizeId(id),
      originalId: id,
      name: name || id,
      message: message,
      tokens: tokens,
      suggestions: suggestions,
      examples: examples.slice(0, 2),
      category: category,
      source: filename,
    });
  }

  return rules;
}

/**
 * Extract token patterns from pattern content
 */
function extractTokens(patternContent) {
  const tokens = [];
  const tokenRegex = /<token([^>]*)>([^<]*)<\/token>|<token([^>]*)\/>/g;

  let match;
  while ((match = tokenRegex.exec(patternContent)) !== null) {
    const attrs = match[1] || match[3] || '';
    const text = match[2] || '';

    // Parse attributes
    const isRegexp = attrs.includes('regexp="yes"');
    const caseSensitive = attrs.includes('case_sensitive="yes"');
    const negate = attrs.includes('negate="yes"');
    const min = attrs.match(/min="(\d+)"/)?.[1] || null;
    const postag = attrs.match(/postag="([^"]+)"/)?.[1] || null;

    // Get inflected or text value
    let value = text.trim();
    const inflectedMatch = attrs.match(/inflected="([^"]+)"/);
    if (inflectedMatch) value = inflectedMatch[1];

    // Skip empty tokens or POS-only tokens for now
    if (!value && !postag) continue;

    tokens.push({
      text: value,
      isRegexp: isRegexp,
      caseSensitive: caseSensitive,
      negate: negate,
      min: min,
      postag: postag,
    });
  }

  return tokens;
}

/**
 * Build regex pattern from tokens
 */
function buildPattern(tokens) {
  if (tokens.length === 0) return null;

  const parts = [];

  for (const token of tokens) {
    if (!token.text && token.postag) {
      // POS tag only - match any word
      parts.push('\\S+');
      continue;
    }

    if (!token.text) continue;

    let pattern = token.text;

    // Escape if not regexp
    if (!token.isRegexp) {
      pattern = escapeRegex(pattern);
    }

    // Add word boundaries
    if (!pattern.startsWith('\\b') && /^[a-zA-Z]/.test(pattern)) {
      pattern = '\\b' + pattern;
    }
    if (!pattern.endsWith('\\b') && /[a-zA-Z]$/.test(pattern)) {
      pattern = pattern + '\\b';
    }

    // Handle negation
    if (token.negate) {
      pattern = `(?!${pattern})\\S+`;
    }

    // Handle optional (min="0")
    if (token.min === '0') {
      pattern = `(?:${pattern}\\s+)?`;
    } else {
      parts.push(pattern);
    }
  }

  if (parts.length === 0) return null;

  // Join with flexible whitespace
  return parts.join('\\s+');
}

/**
 * Generate TypeScript rule file
 */
function generateTSRule(rule) {
  const pattern = buildPattern(rule.tokens);
  if (!pattern) return null;

  // Escape special characters in strings
  const escapedMessage = escapeString(rule.message);
  const escapedName = escapeString(rule.name);
  const escapedPattern = pattern.replace(/\\/g, '\\\\');

  return `import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * ${rule.name}
 * 
 * Source: LanguageTool (${rule.originalId})
 * Category: ${rule.category}
 */
export const ${toCamelCase(rule.id)}Rule: GrammarRule = {
  id: '${rule.id}',
  name: '${escapedName}',
  description: '${escapedMessage}',
  category: '${rule.category}',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /${escapedPattern}/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '${escapedMessage}',
        suggestions: ${JSON.stringify(rule.suggestions)},
      });
    }
    
    return issues;
  },
};
`;
}

/**
 * Clean text by removing XML tags and entities
 */
function cleanText(text) {
  return text
    .replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#x[0-9A-Fa-f]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Escape string for JavaScript
 */
function escapeString(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r');
}

/**
 * Escape string for use in regex
 */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Normalize ID for filename
 */
function normalizeId(id) {
  return id
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50);
}

/**
 * Convert ID to camelCase (handles numbers too)
 */
function toCamelCase(str) {
  // First replace all non-alphanumeric with hyphens
  return str
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .replace(/-([a-z0-9])/gi, (_, char) => char.toUpperCase())
    .replace(/^[A-Z]/, (letter) => letter.toLowerCase())
    .replace(/^[0-9]/, (num) => '_' + num); // Ensure doesn't start with number
}

/**
 * Main conversion function
 */
async function main() {
  const LT_RULES_BASE = path.join(
    __dirname,
    '../.temp/languagetool/languagetool-language-modules/en/src/main/resources/org/languagetool/rules/en'
  );

  console.log('🔨 LanguageTool Rule Converter v2\n');
  console.log(`📂 Source: ${LT_RULES_BASE}`);
  console.log(`📁 Output: ${OUTPUT_DIR}\n`);

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Find all XML files recursively
  function findXmlFiles(dir) {
    const files = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...findXmlFiles(fullPath));
      } else if (
        entry.name.endsWith('.xml') &&
        (entry.name.includes('grammar') || entry.name.includes('style'))
      ) {
        files.push(fullPath);
      }
    }
    return files;
  }

  const xmlFiles = findXmlFiles(LT_RULES_BASE);
  console.log(`Found ${xmlFiles.length} XML files to process\n`);

  let totalRules = 0;
  let convertedRules = 0;
  let skippedRules = 0;
  const allRules = [];
  const rulesByCategory = {};
  const processedIds = new Set();

  for (const filepath of xmlFiles) {
    if (!fs.existsSync(filepath)) {
      console.log(`⚠️  File not found: ${filepath}`);
      continue;
    }

    const filename = path.basename(filepath);
    const relPath = path.relative(LT_RULES_BASE, filepath);
    console.log(`📄 Processing ${relPath}...`);

    const xmlContent = fs.readFileSync(filepath, 'utf8');
    const rules = extractRulesFromXML(xmlContent, filename);

    console.log(`   Found ${rules.length} rules`);
    totalRules += rules.length;

    // Create category directory
    for (const rule of rules) {
      // Skip duplicates by original ID
      if (processedIds.has(rule.originalId)) {
        skippedRules++;
        continue;
      }
      processedIds.add(rule.originalId);

      const category = rule.category;
      const categoryDir = path.join(OUTPUT_DIR, category);

      if (!fs.existsSync(categoryDir)) {
        fs.mkdirSync(categoryDir, { recursive: true });
      }

      // Generate TypeScript
      const tsCode = generateTSRule(rule);
      if (!tsCode) {
        skippedRules++;
        continue;
      }

      // Write file
      const outputPath = path.join(categoryDir, `${rule.id}.ts`);

      // Skip if file already exists with different ID (prevent duplicates)
      if (fs.existsSync(outputPath)) {
        skippedRules++;
        continue;
      }

      fs.writeFileSync(outputPath, tsCode);
      convertedRules++;

      // Track for index generation
      if (!rulesByCategory[category]) {
        rulesByCategory[category] = [];
      }
      rulesByCategory[category].push(rule);
      allRules.push(rule);

      if (convertedRules % 100 === 0) {
        console.log(`   ✅ Converted ${convertedRules} rules...`);
      }
    }
  }

  // Generate index files for each category
  console.log('\n📝 Generating index files...');

  for (const [category, rules] of Object.entries(rulesByCategory)) {
    const categoryDir = path.join(OUTPUT_DIR, category);

    const imports = rules
      .map((r) => `import { ${toCamelCase(r.id)}Rule } from './${r.id}';`)
      .join('\n');

    const exports = rules.map((r) => `  ${toCamelCase(r.id)}Rule,`).join('\n');

    const indexContent = `/**
 * ${category.toUpperCase()} Rules
 * Imported from LanguageTool
 * Total: ${rules.length} rules
 */

${imports}

export const ${toCamelCase(category)}Rules = [
${exports}
];

export default ${toCamelCase(category)}Rules;
`;

    fs.writeFileSync(path.join(categoryDir, 'index.ts'), indexContent);
  }

  // Generate main index
  const categories = Object.keys(rulesByCategory);
  const mainIndexContent = `/**
 * Grammar Rules - Imported from LanguageTool
 * 
 * LanguageTool - https://languagetool.org
 * License: LGPL 2.1
 * 
 * Total rules: ${convertedRules}
 * Categories: ${categories.join(', ')}
 * 
 * These rules were automatically converted from LanguageTool's XML format
 * to Spellbound's TypeScript format. Original rules © LanguageTool contributors.
 */

${categories.map((cat) => `import { ${toCamelCase(cat)}Rules } from './${cat}';`).join('\n')}

export const importedRules = [
${categories.map((cat) => `  ...${toCamelCase(cat)}Rules,`).join('\n')}
];

${categories.map((cat) => `export { ${toCamelCase(cat)}Rules } from './${cat}';`).join('\n')}

export default importedRules;
`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.ts'), mainIndexContent);

  // Summary
  console.log(`\n${'='.repeat(60)}`);
  console.log('✅ CONVERSION COMPLETE!');
  console.log(`${'='.repeat(60)}`);
  console.log(`   Total rules found: ${totalRules.toLocaleString()}`);
  console.log(`   Successfully converted: ${convertedRules.toLocaleString()}`);
  console.log(`   Skipped (complex/duplicate): ${skippedRules.toLocaleString()}`);
  console.log(`   Categories: ${categories.join(', ')}`);
  console.log(`\n📁 Output: ${OUTPUT_DIR}`);
  console.log(`\nRule counts by category:`);
  for (const [cat, rules] of Object.entries(rulesByCategory)) {
    console.log(`   - ${cat}: ${rules.length} rules`);
  }
}

main().catch(console.error);
