import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Dominos Pizza
 * 
 * Source: LanguageTool (DOMINOS_PIZZA)
 * Category: grammar
 */
export const dominosPizzaRule: GrammarRule = {
  id: 'dominos-pizza',
  name: 'Dominos Pizza',
  description: 'Did you mean the restaurant chain Domino\'s Pizza (capitalized and spelled with a possessive apostrophe)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bDominos?\s+\bPizza\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the restaurant chain Domino\'s Pizza (capitalized and spelled with a possessive apostrophe)?',
        suggestions: ["Domino's Pizza"],
      });
    }
    
    return issues;
  },
};
