import type { GrammarRule, RuleContext, GrammarIssue } from '../../types';

/**
 * Capitalization rules for grammar checking
 */

/**
 * Rule: Capitalize first letter of sentences
 */
export const sentenceCapitalization: GrammarRule = {
  id: 'capitalization/sentence-start',
  name: 'Sentence Capitalization',
  description: 'First letter of a sentence should be capitalized',
  severity: 'error',
  category: 'capitalization',
  enabled: true,
  check(context: RuleContext): GrammarIssue[] {
    const issues: GrammarIssue[] = [];

    for (const sentence of context.sentences) {
      // Find first word token in sentence
      const firstWord = sentence.tokens.find((t) => t.type === 'word');

      if (firstWord && /^[a-z]/.test(firstWord.value)) {
        const capitalizedWord =
          firstWord.value[0].toUpperCase() + firstWord.value.slice(1);

        issues.push(
          context.createIssue({
            start: firstWord.start,
            end: firstWord.end,
            match: firstWord.value,
            message: 'Sentence should start with a capital letter',
            replacements: [capitalizedWord],
          })
        );
      }
    }

    return issues;
  },
};

/**
 * Rule: Capitalize "I" when used as a pronoun
 */
export const capitalizeI: GrammarRule = {
  id: 'capitalization/i-pronoun',
  name: 'Capitalize I',
  description: 'The pronoun "I" should always be capitalized',
  severity: 'error',
  category: 'capitalization',
  enabled: true,
  check(context: RuleContext): GrammarIssue[] {
    const issues: GrammarIssue[] = [];
    const regex = /\bi\b/g;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(context.text)) !== null) {
      // Check if it's actually "i" not "I"
      if (context.text[match.index] === 'i') {
        issues.push(
          context.createIssue({
            start: match.index,
            end: match.index + 1,
            match: 'i',
            message: 'The pronoun "I" should always be capitalized',
            replacements: ['I'],
          })
        );
      }
    }

    return issues;
  },
};

/**
 * Rule: Capitalize proper nouns (common ones)
 */
export const capitalizeProperNouns: GrammarRule = {
  id: 'capitalization/proper-nouns',
  name: 'Capitalize Proper Nouns',
  description: 'Proper nouns should be capitalized',
  severity: 'warning',
  category: 'capitalization',
  enabled: true,
  check(context: RuleContext): GrammarIssue[] {
    const issues: GrammarIssue[] = [];

    // Days of the week
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    // Months
    const months = [
      'january', 'february', 'march', 'april', 'may', 'june',
      'july', 'august', 'september', 'october', 'november', 'december'
    ];
    
    const properNouns = [...days, ...months];

    for (const noun of properNouns) {
      const regex = new RegExp(`\\b${noun}\\b`, 'gi');
      let match: RegExpExecArray | null;

      while ((match = regex.exec(context.text)) !== null) {
        const found = match[0];
        // Only flag if lowercase
        if (found[0] === found[0].toLowerCase()) {
          const capitalized = found[0].toUpperCase() + found.slice(1).toLowerCase();
          issues.push(
            context.createIssue({
              start: match.index,
              end: match.index + found.length,
              match: found,
              message: `"${capitalized}" should be capitalized`,
              replacements: [capitalized],
            })
          );
        }
      }
    }

    return issues;
  },
};

/**
 * Rule: Capitalize after colon in specific cases
 */
export const capitalizeAfterColon: GrammarRule = {
  id: 'capitalization/after-colon',
  name: 'Capitalize After Colon',
  description: 'Capitalize complete sentences after a colon',
  severity: 'info',
  category: 'capitalization',
  enabled: false, // Optional rule, disabled by default
  check(context: RuleContext): GrammarIssue[] {
    const issues: GrammarIssue[] = [];
    const regex = /:\s+([a-z])/g;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(context.text)) !== null) {
      // Check if what follows looks like a complete sentence
      const afterColon = context.text.slice(match.index + 2, match.index + 50);
      const hasVerb = /\b(is|are|was|were|have|has|had|will|would|can|could|should|must)\b/i.test(afterColon);

      if (hasVerb) {
        const letterStart = match.index + match[0].length - 1;
        const letter = match[1];

        issues.push(
          context.createIssue({
            start: letterStart,
            end: letterStart + 1,
            match: letter,
            message: 'Consider capitalizing the first letter after a colon when it begins a complete sentence',
            replacements: [letter.toUpperCase()],
          })
        );
      }
    }

    return issues;
  },
};

export const capitalizationRules: GrammarRule[] = [
  sentenceCapitalization,
  capitalizeI,
  capitalizeProperNouns,
  capitalizeAfterColon,
];
