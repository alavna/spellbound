import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Compere (compère or compare)
 * 
 * Source: LanguageTool (COMPERE)
 * Category: grammar
 */
export const compereRule: GrammarRule = {
  id: 'compere',
  name: 'Compere (compère or compare)',
  description: 'Did you mean the verb or the noun (master of ceremonies)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcomper(e|ing|es|ed)?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the verb or the noun (master of ceremonies)?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
