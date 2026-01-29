import type { GrammarRule, RuleContext, GrammarIssue } from '../../types';

/**
 * Repetition rules for grammar checking
 */

/**
 * Rule: Repeated words
 */
export const repeatedWords: GrammarRule = {
  id: 'repetition/double-words',
  name: 'Repeated Words',
  description: 'Detect accidentally repeated words',
  severity: 'error',
  category: 'repetition',
  enabled: true,
  check(context: RuleContext): GrammarIssue[] {
    const issues: GrammarIssue[] = [];
    // Match repeated words with optional whitespace between
    const regex = /\b(\w+)\s+\1\b/gi;
    let match: RegExpExecArray | null;

    // Words that are commonly intentionally repeated
    const allowedRepeats = new Set([
      'that', 'had', 'very', 'really', 'much', 'so', 'too',
      'bye', 'no', 'yes', 'ha', 'oh', 'uh', 'um',
    ]);

    while ((match = regex.exec(context.text)) !== null) {
      const word = match[1].toLowerCase();

      // Skip allowed repeated words
      if (allowedRepeats.has(word)) {
        continue;
      }

      issues.push(
        context.createIssue({
          start: match.index,
          end: match.index + match[0].length,
          match: match[0],
          message: `Repeated word: "${match[1]}"`,
          replacements: [match[1]],
        })
      );
    }

    return issues;
  },
};

/**
 * Rule: Repeated phrases
 */
export const repeatedPhrases: GrammarRule = {
  id: 'repetition/double-phrases',
  name: 'Repeated Phrases',
  description: 'Detect accidentally repeated short phrases',
  severity: 'warning',
  category: 'repetition',
  enabled: true,
  check(context: RuleContext): GrammarIssue[] {
    const issues: GrammarIssue[] = [];
    // Match repeated 2-3 word phrases
    const regex = /\b((\w+\s+){1,2}\w+)\s+\1\b/gi;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(context.text)) !== null) {
      issues.push(
        context.createIssue({
          start: match.index,
          end: match.index + match[0].length,
          match: match[0],
          message: `Repeated phrase: "${match[1]}"`,
          replacements: [match[1]],
        })
      );
    }

    return issues;
  },
};

/**
 * Rule: Redundant expressions
 */
export const redundantExpressions: GrammarRule = {
  id: 'repetition/redundant',
  name: 'Redundant Expressions',
  description: 'Detect redundant or pleonastic expressions',
  severity: 'info',
  category: 'style',
  enabled: true,
  check(context: RuleContext): GrammarIssue[] {
    const issues: GrammarIssue[] = [];

    const redundancies: Array<{ pattern: RegExp; replacement: string; message: string }> = [
      {
        pattern: /\babsolutely\s+essential\b/gi,
        replacement: 'essential',
        message: '"absolutely essential" is redundant; use "essential"',
      },
      {
        pattern: /\bactual\s+fact\b/gi,
        replacement: 'fact',
        message: '"actual fact" is redundant; use "fact"',
      },
      {
        pattern: /\badvance\s+planning\b/gi,
        replacement: 'planning',
        message: '"advance planning" is redundant; use "planning"',
      },
      {
        pattern: /\badded\s+bonus\b/gi,
        replacement: 'bonus',
        message: '"added bonus" is redundant; use "bonus"',
      },
      {
        pattern: /\bbasic\s+fundamentals\b/gi,
        replacement: 'fundamentals',
        message: '"basic fundamentals" is redundant; use "fundamentals"',
      },
      {
        pattern: /\bclose\s+proximity\b/gi,
        replacement: 'proximity',
        message: '"close proximity" is redundant; use "proximity" or "nearby"',
      },
      {
        pattern: /\bcomplete\s+opposite\b/gi,
        replacement: 'opposite',
        message: '"complete opposite" is redundant; use "opposite"',
      },
      {
        pattern: /\bend\s+result\b/gi,
        replacement: 'result',
        message: '"end result" is redundant; use "result"',
      },
      {
        pattern: /\bexact\s+same\b/gi,
        replacement: 'same',
        message: '"exact same" is redundant; use "same"',
      },
      {
        pattern: /\bfinal\s+outcome\b/gi,
        replacement: 'outcome',
        message: '"final outcome" is redundant; use "outcome"',
      },
      {
        pattern: /\bfree\s+gift\b/gi,
        replacement: 'gift',
        message: '"free gift" is redundant; use "gift"',
      },
      {
        pattern: /\bfuture\s+plans\b/gi,
        replacement: 'plans',
        message: '"future plans" is redundant; use "plans"',
      },
      {
        pattern: /\bpast\s+history\b/gi,
        replacement: 'history',
        message: '"past history" is redundant; use "history"',
      },
      {
        pattern: /\bpersonal\s+opinion\b/gi,
        replacement: 'opinion',
        message: '"personal opinion" is redundant; use "opinion"',
      },
      {
        pattern: /\brevert\s+back\b/gi,
        replacement: 'revert',
        message: '"revert back" is redundant; use "revert"',
      },
      {
        pattern: /\breturn\s+back\b/gi,
        replacement: 'return',
        message: '"return back" is redundant; use "return"',
      },
      {
        pattern: /\bunexpected\s+surprise\b/gi,
        replacement: 'surprise',
        message: '"unexpected surprise" is redundant; use "surprise"',
      },
      {
        pattern: /\bvery\s+unique\b/gi,
        replacement: 'unique',
        message: '"very unique" is incorrect; "unique" means one of a kind',
      },
    ];

    for (const { pattern, replacement, message } of redundancies) {
      let match: RegExpExecArray | null;
      pattern.lastIndex = 0;

      while ((match = pattern.exec(context.text)) !== null) {
        issues.push(
          context.createIssue({
            start: match.index,
            end: match.index + match[0].length,
            match: match[0],
            message,
            replacements: [replacement],
          })
        );
      }
    }

    return issues;
  },
};

export const repetitionRules: GrammarRule[] = [
  repeatedWords,
  repeatedPhrases,
  redundantExpressions,
];
