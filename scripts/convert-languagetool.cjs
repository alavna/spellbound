#!/usr/bin/env node

/**
 * LanguageTool Rule Converter
 *
 * Converts LanguageTool XML grammar rules to Spellbound's TypeScript format.
 *
 * Usage:
 *   1. Clone LanguageTool: git clone https://github.com/languagetool-org/languagetool.git
 *   2. Run converter: node scripts/convert-languagetool.cjs [options]
 *
 * Options:
 *   --input <path>    Path to LanguageTool rules directory
 *   --output <path>   Output directory for converted rules
 *   --limit <number>  Maximum number of rules to convert (for testing)
 *   --categories      Comma-separated categories to convert (grammar,style,etc)
 */

const fs = require('fs');
const path = require('path');
const { parseString } = require('xml2js');

const CATEGORY_MAP = {
  'grammar.xml': 'grammar',
  'grammar-style.xml': 'style',
  'grammar-coherency.xml': 'coherency',
  'grammar-barbarism.xml': 'common-mistakes',
  'confusion_sets.txt': 'confusion',
};

const SEVERITY_MAP = {
  error: 'error',
  warning: 'warning',
  info: 'suggestion',
  hint: 'info',
};

/**
 * Parse LanguageTool XML rule file
 */
async function parseXMLFile(filePath) {
  return new Promise((resolve, reject) => {
    let xml = fs.readFileSync(filePath, 'utf8');

    // Clean up problematic XML entities
    xml = xml.replace(/&nbsp;/g, ' ');
    xml = xml.replace(/&rsquo;/g, "'");
    xml = xml.replace(/&lsquo;/g, "'");
    xml = xml.replace(/&rdquo;/g, '"');
    xml = xml.replace(/&ldquo;/g, '"');
    xml = xml.replace(/&mdash;/g, '—');
    xml = xml.replace(/&ndash;/g, '–');
    xml = xml.replace(/&hellip;/g, '...');

    parseString(xml, { strict: false, trim: true }, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

/**
 * Convert LanguageTool rule to Spellbound format
 */
function convertRule(ltRule, category) {
  const ruleId = ltRule.$.id || ltRule.$.name || 'unknown';
  const ruleName = ltRule.$.name || ruleId;

  // Extract pattern tokens
  const pattern = ltRule.pattern?.[0];
  if (!pattern || !pattern.token) {
    console.warn(`Skipping rule ${ruleId}: No pattern found`);
    return null;
  }

  const tokens = pattern.token.map((token) => {
    const isRegexp = token.$.regexp === 'yes';
    const text = token._ || token.$.inflected || '';
    const postag = token.$.postag;
    const caseSensitive = token.$.case_sensitive === 'yes';

    return {
      text,
      isRegexp,
      postag,
      caseSensitive,
      negate: token.$.negate === 'yes',
      skip: token.$.skip ? parseInt(token.$.skip) : 0,
    };
  });

  // Extract message and suggestions
  const message = ltRule.message?.[0];
  let messageText = '';
  let suggestions = [];

  if (typeof message === 'string') {
    messageText = message;
  } else if (message && message._) {
    messageText = message._;
    // Extract suggestions from <suggestion> tags
    if (message.suggestion) {
      suggestions = message.suggestion
        .map((s) => {
          if (typeof s === 'string') return s;
          if (s._) return s._;
          return '';
        })
        .filter(Boolean);
    }
  }

  // Extract examples
  const examples =
    ltRule.example
      ?.map((ex) => {
        const incorrect = ex.$.correction ? ex._ : null;
        const correct = ex.$.correction || null;
        return { incorrect, correct };
      })
      .filter((ex) => ex.incorrect) || [];

  // Build regex pattern from tokens
  const regexPattern = buildRegexFromTokens(tokens);

  // Generate TypeScript rule code
  const rule = {
    id: normalizeId(ruleId),
    name: ruleName,
    description: ltRule.short?.[0] || messageText || 'Grammar rule',
    category: category,
    severity: SEVERITY_MAP[ltRule.$.level] || 'warning',
    tags: extractTags(ltRule),
    enabled: ltRule.$.default !== 'off',
    pattern: regexPattern,
    message: messageText,
    suggestions: suggestions,
    examples: examples.slice(0, 2), // Keep first 2 examples
    source: 'LanguageTool',
  };

  return rule;
}

/**
 * Build regex pattern from LanguageTool tokens
 */
function buildRegexFromTokens(tokens) {
  const parts = [];

  for (const token of tokens) {
    if (token.skip > 0) {
      // Skip tokens between matches
      parts.push(`(?:\\S+\\s+){0,${token.skip}}`);
    }

    let pattern = token.text;

    if (!token.isRegexp) {
      // Escape special regex characters
      pattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    if (token.negate) {
      // Negative lookahead
      pattern = `(?!${pattern})\\S+`;
    }

    // Word boundary
    if (!token.isRegexp || !pattern.startsWith('\\b')) {
      pattern = `\\b${pattern}\\b`;
    }

    parts.push(pattern);
  }

  return parts.join('\\s+');
}

/**
 * Normalize rule ID for TypeScript
 */
function normalizeId(id) {
  return id
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Extract tags from rule
 */
function extractTags(rule) {
  const tags = [];

  if (rule.$.type) {
    tags.push(rule.$.type);
  }

  if (rule.antipattern) {
    tags.push('complex');
  }

  return tags;
}

/**
 * Generate TypeScript rule file
 */
function generateTypeScriptRule(rule) {
  return `import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * ${rule.description}
 * 
 * Source: LanguageTool (${rule.id})
 * Category: ${rule.category}
 * 
 * Examples:
${rule.examples.map((ex) => ` * - Incorrect: "${ex.incorrect}"`).join('\n')}
${rule.examples
  .map((ex) => (ex.correct ? ` *   Correct: "${ex.correct}"` : ''))
  .filter(Boolean)
  .join('\n')}
 */
export const ${toCamelCase(rule.id)}Rule: GrammarRule = {
  id: '${rule.id}',
  name: '${rule.name.replace(/'/g, "\\'")}',
  description: '${rule.description.replace(/'/g, "\\'")}',
  category: '${rule.category}',
  severity: '${rule.severity}',
  tags: ${JSON.stringify(rule.tags)},
  enabled: ${rule.enabled},

  check(context: GrammarRuleContext) {
    const pattern = /${rule.pattern}/gi;
    const issues = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '${rule.message.replace(/'/g, "\\'")}',
        suggestions: ${JSON.stringify(rule.suggestions)},
      });
    }
    
    return issues;
  },
};
`;
}

/**
 * Convert ID to camelCase for variable names
 */
function toCamelCase(str) {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Process all XML files in directory
 */
async function processDirectory(inputDir, outputDir, options = {}) {
  const { limit, categories } = options;

  console.log(`\n📦 Processing LanguageTool rules from: ${inputDir}`);
  console.log(`📂 Output directory: ${outputDir}\n`);

  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs
    .readdirSync(inputDir)
    .filter((f) => f.endsWith('.xml'))
    .filter((f) => !categories || categories.includes(CATEGORY_MAP[f]));

  console.log(`Found ${files.length} XML files to process\n`);

  let totalRules = 0;
  let convertedRules = 0;
  let skippedRules = 0;

  for (const file of files) {
    const category = CATEGORY_MAP[file] || 'other';
    console.log(`\n📄 Processing ${file} (${category})...`);

    try {
      const filePath = path.join(inputDir, file);
      const data = await parseXMLFile(filePath);

      const rules = data?.rules?.rule || data?.rule || [];
      console.log(`   Found ${rules.length} rules`);

      totalRules += rules.length;

      // Create category directory
      const categoryDir = path.join(outputDir, category);
      if (!fs.existsSync(categoryDir)) {
        fs.mkdirSync(categoryDir, { recursive: true });
      }

      // Convert each rule
      for (const ltRule of rules) {
        if (limit && convertedRules >= limit) {
          console.log(`\n⚠️  Reached limit of ${limit} rules, stopping`);
          break;
        }

        try {
          const rule = convertRule(ltRule, category);

          if (!rule) {
            skippedRules++;
            continue;
          }

          // Generate TypeScript file
          const tsCode = generateTypeScriptRule(rule);
          const filename = `${rule.id}.ts`;
          const outputPath = path.join(categoryDir, filename);

          fs.writeFileSync(outputPath, tsCode);
          convertedRules++;

          if (convertedRules % 100 === 0) {
            console.log(`   ✅ Converted ${convertedRules} rules...`);
          }
        } catch (error) {
          console.error(`   ❌ Error converting rule: ${error.message}`);
          skippedRules++;
        }
      }

      if (limit && convertedRules >= limit) break;
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  }

  // Generate index file for each category
  console.log(`\n\n📝 Generating index files...`);

  const foundCategories = [...new Set(files.map((f) => CATEGORY_MAP[f] || 'other'))];

  for (const category of foundCategories) {
    const categoryDir = path.join(outputDir, category);
    if (!fs.existsSync(categoryDir)) continue;

    const ruleFiles = fs
      .readdirSync(categoryDir)
      .filter((f) => f.endsWith('.ts') && f !== 'index.ts');

    const imports = ruleFiles
      .map((f) => {
        const name = toCamelCase(f.replace('.ts', ''));
        const file = f.replace('.ts', '');
        return `import { ${name}Rule } from './${file}';`;
      })
      .join('\n');

    const exports = ruleFiles
      .map((f) => {
        const name = toCamelCase(f.replace('.ts', ''));
        return `  ${name}Rule,`;
      })
      .join('\n');

    const indexContent = `/**
 * ${category.toUpperCase()} Rules
 * Imported from LanguageTool
 */

${imports}

export const ${toCamelCase(category)}Rules = [
${exports}
];
`;

    fs.writeFileSync(path.join(categoryDir, 'index.ts'), indexContent);
  }

  // Generate main index
  const mainIndexContent = `/**
 * Grammar Rules - Imported from LanguageTool
 * 
 * Total rules: ${convertedRules}
 * Categories: ${foundCategories.join(', ')}
 */

${foundCategories.map((cat) => `import { ${toCamelCase(cat)}Rules } from './${cat}';`).join('\n')}

export const importedRules = [
${foundCategories.map((cat) => `  ...${toCamelCase(cat)}Rules,`).join('\n')}
];

export * from './grammar';
export * from './style';
export * from './common-mistakes';
`;

  fs.writeFileSync(path.join(outputDir, 'index.ts'), mainIndexContent);

  console.log(`\n\n✅ Conversion complete!`);
  console.log(`   Total rules found: ${totalRules}`);
  console.log(`   Successfully converted: ${convertedRules}`);
  console.log(`   Skipped: ${skippedRules}`);
  console.log(`   Categories: ${foundCategories.join(', ')}`);
  console.log(`\n📁 Output: ${outputDir}\n`);
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);

  let inputDir = null;
  let outputDir = path.join(__dirname, '../packages/core/src/rules/imported');
  let limit = null;
  let categories = null;

  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--input':
        inputDir = args[++i];
        break;
      case '--output':
        outputDir = args[++i];
        break;
      case '--limit':
        limit = parseInt(args[++i]);
        break;
      case '--categories':
        categories = args[++i].split(',');
        break;
      case '--help':
        console.log(`
LanguageTool Rule Converter

Usage:
  node scripts/convert-languagetool.cjs [options]

Options:
  --input <path>       Path to LanguageTool rules directory
  --output <path>      Output directory (default: packages/core/src/rules/imported)
  --limit <number>     Maximum number of rules to convert
  --categories <list>  Comma-separated categories to convert
  --help               Show this help

Example:
  # Convert first 50 grammar rules
  node scripts/convert-languagetool.cjs \\
    --input ~/languagetool/languagetool-language-modules/en/src/main/resources/org/languagetool/rules/en/ \\
    --limit 50 \\
    --categories grammar,style
        `);
        process.exit(0);
    }
  }

  if (!inputDir) {
    console.error('❌ Error: --input directory is required\n');
    console.log('Use --help for usage information');
    process.exit(1);
  }

  if (!fs.existsSync(inputDir)) {
    console.error(`❌ Error: Input directory does not exist: ${inputDir}`);
    process.exit(1);
  }

  try {
    await processDirectory(inputDir, outputDir, { limit, categories });
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { convertRule, processDirectory };
