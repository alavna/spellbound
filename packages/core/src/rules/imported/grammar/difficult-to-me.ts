import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Collocation: difficult to/for
 * 
 * Source: LanguageTool (DIFFICULT_TO_ME)
 * Category: grammar
 */
export const difficultToMeRule: GrammarRule = {
  id: 'difficult-to-me',
  name: 'Collocation: difficult to/for',
  description: 'The usual preposition after \"difficult\" is \"for\" when followed by a pronoun. \"Difficult\" and \"to\" only appear together when \"to\" is part of an infinitive structure.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdifficult\b\s+\bto\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The usual preposition after \"difficult\" is \"for\" when followed by a pronoun. \"Difficult\" and \"to\" only appear together when \"to\" is part of an infinitive structure.',
        suggestions: ["\\1 for \\3"],
      });
    }
    
    return issues;
  },
};
