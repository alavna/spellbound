import type { GrammarRule, RuleContext, GrammarIssue } from '../../types';

/**
 * Article (a/an) rules for grammar checking
 */

/**
 * Rule: Use "an" before vowel sounds
 */
export const articleAn: GrammarRule = {
  id: 'articles/a-an',
  name: 'Article A/An',
  description: 'Use "a" before consonant sounds and "an" before vowel sounds',
  severity: 'error',
  category: 'grammar',
  enabled: true,
  check(context: RuleContext): GrammarIssue[] {
    const issues: GrammarIssue[] = [];

    // Words that start with vowel letters but consonant sounds
    const consonantSoundWords = new Set([
      'uniform', 'uniforms', 'union', 'unions', 'unique', 'unit', 'units', 'united',
      'universal', 'universe', 'university', 'universities', 'usage', 'use', 'used',
      'useful', 'user', 'users', 'usual', 'usually', 'utility', 'utilities',
      'european', 'euro', 'euros', 'euphemism', 'eulogy',
      'one', 'once', 'one-time', 'one-way',
    ]);

    // Words that start with consonant letters but vowel sounds
    const vowelSoundWords = new Set([
      'hour', 'hours', 'hourly', 'honest', 'honestly', 'honor', 'honour', 'honored',
      'honoured', 'honorable', 'honourable', 'heir', 'heirs', 'herb', 'herbs',
      'mba', 'nba', 'fbi', 'html', 'http', 'sql', 'xml', 'x-ray', 'x-rays',
    ]);

    // Check for "a" before vowel sounds
    const aBeforeVowelRegex = /\ba\s+([aeiouAEIOU]\w*)/g;
    let match: RegExpExecArray | null;

    while ((match = aBeforeVowelRegex.exec(context.text)) !== null) {
      const word = match[1].toLowerCase();

      // Skip if the word has a consonant sound
      if (consonantSoundWords.has(word)) {
        continue;
      }

      issues.push(
        context.createIssue({
          start: match.index,
          end: match.index + match[0].length,
          match: match[0],
          message: 'Use "an" before words beginning with a vowel sound',
          replacements: ['an ' + match[1]],
        })
      );
    }

    // Check for "an" before consonant sounds
    const anBeforeConsonantRegex = /\ban\s+([bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]\w*)/g;

    while ((match = anBeforeConsonantRegex.exec(context.text)) !== null) {
      const word = match[1].toLowerCase();

      // Skip if the word has a vowel sound
      if (vowelSoundWords.has(word)) {
        continue;
      }

      // Skip single letters that might be pronounced with vowel sound
      if (match[1].length <= 2 && /^[fhlmnrsx]$/i.test(match[1])) {
        continue;
      }

      issues.push(
        context.createIssue({
          start: match.index,
          end: match.index + match[0].length,
          match: match[0],
          message: 'Use "a" before words beginning with a consonant sound',
          replacements: ['a ' + match[1]],
        })
      );
    }

    // Special case: "an" before "h" words where h is silent
    const anBeforeHRegex = /\ba\s+(hour|honest|honor|honour|heir|herb)\w*/gi;

    while ((match = anBeforeHRegex.exec(context.text)) !== null) {
      issues.push(
        context.createIssue({
          start: match.index,
          end: match.index + match[0].length,
          match: match[0],
          message: 'Use "an" before words with silent "h"',
          replacements: ['an ' + match[1]],
        })
      );
    }

    return issues;
  },
};

/**
 * Rule: Missing article
 */
export const missingArticle: GrammarRule = {
  id: 'articles/missing',
  name: 'Missing Article',
  description: 'Detect potentially missing articles',
  severity: 'info',
  category: 'grammar',
  enabled: false, // Disabled by default as it can have false positives
  check(context: RuleContext): GrammarIssue[] {
    const issues: GrammarIssue[] = [];

    // Common patterns where articles are often missing
    const patterns = [
      { pattern: /\b(is|was|be)\s+(very\s+)?(good|great|nice|big|small|important)\s+(thing|idea|way|place)\b/gi, article: 'a' },
      { pattern: /\b(at|in|to)\s+(same)\s+(time|place|way)\b/gi, article: 'the' },
    ];

    for (const { pattern, article } of patterns) {
      let match: RegExpExecArray | null;
      pattern.lastIndex = 0;

      while ((match = pattern.exec(context.text)) !== null) {
        // Find position to insert article
        const insertPos = match[0].lastIndexOf(' ');
        const word = match[0].slice(insertPos + 1);

        issues.push(
          context.createIssue({
            start: match.index,
            end: match.index + match[0].length,
            match: match[0],
            message: `Consider adding "${article}" before "${word}"`,
            replacements: [match[0].slice(0, insertPos + 1) + article + ' ' + word],
          })
        );
      }
    }

    return issues;
  },
};

export const articleRules: GrammarRule[] = [articleAn, missingArticle];
