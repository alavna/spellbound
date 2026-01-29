import type { GrammarRule, RuleContext, GrammarIssue } from '../../types';

// Unicode characters for typography
const CHARS = {
  LEFT_DOUBLE_QUOTE: '\u201C', // "
  RIGHT_DOUBLE_QUOTE: '\u201D', // "
  LEFT_SINGLE_QUOTE: '\u2018', // '
  RIGHT_SINGLE_QUOTE: '\u2019', // '
  EN_DASH: '\u2013', // –
  EM_DASH: '\u2014', // —
  ELLIPSIS: '\u2026', // …
};

/**
 * Typography rules for cleaner writing
 */

/**
 * Rule: Multiple spaces
 */
export const multipleSpaces: GrammarRule = {
  id: 'typography/multiple-spaces',
  name: 'Multiple Spaces',
  description: 'Use single spaces between words',
  severity: 'warning',
  category: 'typography',
  enabled: true,
  check(context: RuleContext): GrammarIssue[] {
    const issues: GrammarIssue[] = [];
    const regex = /[^\S\n]{2,}/g; // Multiple spaces (not newlines)
    let match: RegExpExecArray | null;

    while ((match = regex.exec(context.text)) !== null) {
      issues.push(
        context.createIssue({
          start: match.index,
          end: match.index + match[0].length,
          match: match[0],
          message: 'Use a single space between words',
          replacements: [' '],
        })
      );
    }

    return issues;
  },
};

/**
 * Rule: Straight quotes to smart quotes
 */
export const smartQuotes: GrammarRule = {
  id: 'typography/smart-quotes',
  name: 'Smart Quotes',
  description: 'Use typographic quotation marks',
  severity: 'info',
  category: 'typography',
  enabled: false, // Optional style preference
  check(context: RuleContext): GrammarIssue[] {
    const issues: GrammarIssue[] = [];

    // Opening double quotes
    const openDoubleRegex = /"(?=\w)/g;
    let match: RegExpExecArray | null;

    while ((match = openDoubleRegex.exec(context.text)) !== null) {
      issues.push(
        context.createIssue({
          start: match.index,
          end: match.index + 1,
          match: '"',
          message: 'Consider using typographic opening quotes',
          replacements: [CHARS.LEFT_DOUBLE_QUOTE],
        })
      );
    }

    // Closing double quotes
    const closeDoubleRegex = /(\w)"/g;

    while ((match = closeDoubleRegex.exec(context.text)) !== null) {
      issues.push(
        context.createIssue({
          start: match.index + 1,
          end: match.index + 2,
          match: '"',
          message: 'Consider using typographic closing quotes',
          replacements: [CHARS.RIGHT_DOUBLE_QUOTE],
        })
      );
    }

    // Opening single quotes / apostrophes at word start
    const openSingleRegex = /'(?=\w)/g;

    while ((match = openSingleRegex.exec(context.text)) !== null) {
      // Check if it's an apostrophe (after letter) or opening quote (after space/start)
      const before = context.text[match.index - 1] || '';
      if (!/\w/.test(before)) {
        issues.push(
          context.createIssue({
            start: match.index,
            end: match.index + 1,
            match: "'",
            message: 'Consider using typographic opening single quote',
            replacements: [CHARS.LEFT_SINGLE_QUOTE],
          })
        );
      }
    }

    return issues;
  },
};

/**
 * Rule: En dash for ranges
 */
export const enDashRanges: GrammarRule = {
  id: 'typography/en-dash',
  name: 'En Dash for Ranges',
  description: 'Use en dash for ranges instead of hyphen',
  severity: 'info',
  category: 'typography',
  enabled: false, // Optional style preference
  check(context: RuleContext): GrammarIssue[] {
    const issues: GrammarIssue[] = [];
    // Number ranges with hyphen
    const regex = /(\d+)-(\d+)/g;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(context.text)) !== null) {
      // Only flag if it looks like a range (second number larger)
      const first = parseInt(match[1], 10);
      const second = parseInt(match[2], 10);

      if (second > first) {
        issues.push(
          context.createIssue({
            start: match.index,
            end: match.index + match[0].length,
            match: match[0],
            message: 'Consider using an en dash for ranges',
            replacements: [match[1] + CHARS.EN_DASH + match[2]],
          })
        );
      }
    }

    return issues;
  },
};

/**
 * Rule: Em dash spacing
 */
export const emDashSpacing: GrammarRule = {
  id: 'typography/em-dash',
  name: 'Em Dash Spacing',
  description: 'Em dashes should not have spaces around them',
  severity: 'info',
  category: 'typography',
  enabled: true,
  check(context: RuleContext): GrammarIssue[] {
    const issues: GrammarIssue[] = [];
    // Em dash with spaces
    const emDashRegex = new RegExp('\\s+' + CHARS.EM_DASH + '\\s+', 'g');
    let match: RegExpExecArray | null;

    while ((match = emDashRegex.exec(context.text)) !== null) {
      issues.push(
        context.createIssue({
          start: match.index,
          end: match.index + match[0].length,
          match: match[0],
          message: 'Em dashes typically should not have spaces around them',
          replacements: [CHARS.EM_DASH],
        })
      );
    }

    // Double hyphen that should be em dash
    const doubleHyphenRegex = /\s+--\s+/g;

    while ((match = doubleHyphenRegex.exec(context.text)) !== null) {
      issues.push(
        context.createIssue({
          start: match.index,
          end: match.index + match[0].length,
          match: match[0],
          message: 'Consider using an em dash instead of double hyphens',
          replacements: [CHARS.EM_DASH],
        })
      );
    }

    return issues;
  },
};

/**
 * Rule: Ellipsis
 */
export const ellipsis: GrammarRule = {
  id: 'typography/ellipsis',
  name: 'Ellipsis Character',
  description: 'Use single ellipsis character instead of three periods',
  severity: 'info',
  category: 'typography',
  enabled: false, // Optional
  check(context: RuleContext): GrammarIssue[] {
    const issues: GrammarIssue[] = [];
    const regex = /\.{3}/g;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(context.text)) !== null) {
      issues.push(
        context.createIssue({
          start: match.index,
          end: match.index + 3,
          match: '...',
          message: 'Consider using the ellipsis character',
          replacements: [CHARS.ELLIPSIS],
        })
      );
    }

    return issues;
  },
};

/**
 * Rule: No trailing whitespace
 */
export const trailingWhitespace: GrammarRule = {
  id: 'typography/trailing-whitespace',
  name: 'Trailing Whitespace',
  description: 'Remove trailing whitespace from lines',
  severity: 'info',
  category: 'typography',
  enabled: true,
  check(context: RuleContext): GrammarIssue[] {
    const issues: GrammarIssue[] = [];
    const regex = /[ \t]+$/gm;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(context.text)) !== null) {
      issues.push(
        context.createIssue({
          start: match.index,
          end: match.index + match[0].length,
          match: match[0],
          message: 'Remove trailing whitespace',
          replacements: [''],
        })
      );
    }

    return issues;
  },
};

export const typographyRules: GrammarRule[] = [
  multipleSpaces,
  smartQuotes,
  enDashRanges,
  emDashSpacing,
  ellipsis,
  trailingWhitespace,
];
