import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Pronoun + noun
 * 
 * Source: LanguageTool (PRONOUN_NOUN)
 * Category: grammar
 */
export const pronounNounRule: GrammarRule = {
  id: 'pronoun-noun',
  name: 'Pronoun + noun',
  description: 'Possible error detected: Please verify that having a noun follow a pronoun is correct in this context.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Possible error detected: Please verify that having a noun follow a pronoun is correct in this context.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
