import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Manege (manège or manage)
 * 
 * Source: LanguageTool (MANEGE)
 * Category: grammar
 */
export const manegeRule: GrammarRule = {
  id: 'manege',
  name: 'Manege (manège or manage)',
  description: 'Did you mean the verb or the noun (the art of horsemanship)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmaneges?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the verb or the noun (the art of horsemanship)?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
