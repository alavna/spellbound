import type { GrammarRule, RuleContext, GrammarIssue } from '../../types';

/**
 * Punctuation rules for grammar checking
 */

/**
 * Rule: Missing period at end of sentence
 */
export const missingPeriod: GrammarRule = {
  id: 'punctuation/missing-period',
  name: 'Missing Period',
  description: 'Sentences should end with appropriate punctuation',
  severity: 'warning',
  category: 'punctuation',
  enabled: true,
  check(context: RuleContext): GrammarIssue[] {
    const issues: GrammarIssue[] = [];
    const text = context.text.trim();

    if (text.length === 0) {
      return issues;
    }

    // Check if text ends with proper punctuation
    const lastChar = text[text.length - 1];
    if (!/[.!?]/.test(lastChar)) {
      // Make sure it looks like a sentence (has words)
      const wordCount = (text.match(/\b\w+\b/g) || []).length;
      if (wordCount >= 2) {
        issues.push(
          context.createIssue({
            start: text.length - 1,
            end: text.length,
            match: lastChar,
            message: 'Consider adding a period at the end of the sentence',
            replacements: [lastChar + '.'],
          })
        );
      }
    }

    return issues;
  },
};

/**
 * Rule: Multiple consecutive punctuation marks
 */
export const multiplePunctuation: GrammarRule = {
  id: 'punctuation/multiple-marks',
  name: 'Multiple Punctuation',
  description: 'Avoid multiple consecutive punctuation marks',
  severity: 'warning',
  category: 'punctuation',
  enabled: true,
  check(context: RuleContext): GrammarIssue[] {
    const issues: GrammarIssue[] = [];
    // Match multiple punctuation but allow "..." and "?!" or "!?"
    const regex = /([.]{4,}|[!]{2,}|[?]{3,}|[,]{2,}|[;]{2,}|[:]{2,})/g;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(context.text)) !== null) {
      const replacement = match[1][0] === '.' ? '...' : match[1][0];

      issues.push(
        context.createIssue({
          start: match.index,
          end: match.index + match[0].length,
          match: match[0],
          message: 'Avoid multiple consecutive punctuation marks',
          replacements: [replacement],
        })
      );
    }

    return issues;
  },
};

/**
 * Rule: Space before punctuation
 */
export const spaceBeforePunctuation: GrammarRule = {
  id: 'punctuation/space-before',
  name: 'Space Before Punctuation',
  description: 'Remove space before punctuation marks',
  severity: 'error',
  category: 'punctuation',
  enabled: true,
  check(context: RuleContext): GrammarIssue[] {
    const issues: GrammarIssue[] = [];
    const regex = /\s+([.,;:!?])/g;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(context.text)) !== null) {
      issues.push(
        context.createIssue({
          start: match.index,
          end: match.index + match[0].length,
          match: match[0],
          message: 'Remove space before punctuation',
          replacements: [match[1]],
        })
      );
    }

    return issues;
  },
};

/**
 * Rule: Missing space after punctuation
 */
export const missingSpaceAfterPunctuation: GrammarRule = {
  id: 'punctuation/space-after',
  name: 'Space After Punctuation',
  description: 'Add space after punctuation marks',
  severity: 'error',
  category: 'punctuation',
  enabled: true,
  check(context: RuleContext): GrammarIssue[] {
    const issues: GrammarIssue[] = [];
    // Match punctuation followed by letter (not number, not end of text)
    const regex = /([.,;:!?])([A-Za-z])/g;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(context.text)) !== null) {
      // Don't flag URLs, email addresses, or abbreviations like "e.g." or "i.e."
      const before = context.text.slice(Math.max(0, match.index - 3), match.index);
      if (/[/:@]/.test(before) || /^(e|i)$/.test(before)) {
        continue;
      }

      issues.push(
        context.createIssue({
          start: match.index,
          end: match.index + match[0].length,
          match: match[0],
          message: 'Add a space after the punctuation mark',
          replacements: [match[1] + ' ' + match[2]],
        })
      );
    }

    return issues;
  },
};

/**
 * Rule: Unmatched brackets/parentheses
 */
export const unmatchedBrackets: GrammarRule = {
  id: 'punctuation/unmatched-brackets',
  name: 'Unmatched Brackets',
  description: 'Brackets and parentheses should be properly matched',
  severity: 'error',
  category: 'punctuation',
  enabled: true,
  check(context: RuleContext): GrammarIssue[] {
    const issues: GrammarIssue[] = [];
    const pairs: Record<string, string> = {
      '(': ')',
      '[': ']',
      '{': '}',
    };
    const stack: Array<{ char: string; index: number }> = [];

    for (let i = 0; i < context.text.length; i++) {
      const char = context.text[i];

      if (pairs[char]) {
        // Opening bracket
        stack.push({ char, index: i });
      } else if (Object.values(pairs).includes(char)) {
        // Closing bracket
        const expected = Object.entries(pairs).find(([_, v]) => v === char)?.[0];
        const last = stack.pop();

        if (!last) {
          issues.push(
            context.createIssue({
              start: i,
              end: i + 1,
              match: char,
              message: `Unmatched closing bracket "${char}"`,
              replacements: [],
            })
          );
        } else if (last.char !== expected) {
          issues.push(
            context.createIssue({
              start: i,
              end: i + 1,
              match: char,
              message: `Mismatched bracket: expected "${pairs[last.char]}" but found "${char}"`,
              replacements: [pairs[last.char]],
            })
          );
        }
      }
    }

    // Check for unclosed brackets
    for (const item of stack) {
      issues.push(
        context.createIssue({
          start: item.index,
          end: item.index + 1,
          match: item.char,
          message: `Unclosed bracket "${item.char}"`,
          replacements: [],
        })
      );
    }

    return issues;
  },
};

/**
 * Rule: Comma splice
 */
export const commaSplice: GrammarRule = {
  id: 'punctuation/comma-splice',
  name: 'Comma Splice',
  description: 'Avoid joining independent clauses with just a comma',
  severity: 'warning',
  category: 'punctuation',
  enabled: true,
  check(context: RuleContext): GrammarIssue[] {
    const issues: GrammarIssue[] = [];
    // Simple heuristic: comma followed by pronoun + verb
    const regex = /,\s+(I|you|he|she|it|we|they)\s+(am|is|are|was|were|have|has|had|do|does|did|will|would|can|could|shall|should)\b/gi;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(context.text)) !== null) {
      issues.push(
        context.createIssue({
          start: match.index,
          end: match.index + 1,
          match: ',',
          message: 'Possible comma splice. Consider using a semicolon, period, or conjunction',
          replacements: [';', '.', ', and', ', but'],
        })
      );
    }

    return issues;
  },
};

/**
 * Rule: Oxford comma (optional)
 */
export const oxfordComma: GrammarRule = {
  id: 'punctuation/oxford-comma',
  name: 'Oxford Comma',
  description: 'Use the Oxford comma before "and" or "or" in lists',
  severity: 'info',
  category: 'punctuation',
  enabled: false, // Style preference, disabled by default
  check(context: RuleContext): GrammarIssue[] {
    const issues: GrammarIssue[] = [];
    // Match list pattern: "a, b and c" or "a, b or c"
    const regex = /(\w+),\s+(\w+)\s+(and|or)\s+(\w+)/gi;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(context.text)) !== null) {
      const beforeAnd = match.index + match[1].length + 2 + match[2].length;
      
      issues.push(
        context.createIssue({
          start: beforeAnd,
          end: beforeAnd,
          match: '',
          message: 'Consider adding an Oxford comma before "' + match[3] + '"',
          replacements: [`,`],
        })
      );
    }

    return issues;
  },
};

export const punctuationRules: GrammarRule[] = [
  missingPeriod,
  multiplePunctuation,
  spaceBeforePunctuation,
  missingSpaceAfterPunctuation,
  unmatchedBrackets,
  commaSplice,
  oxfordComma,
];
