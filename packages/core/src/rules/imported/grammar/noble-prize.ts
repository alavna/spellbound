import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Noble (Nobel) Prize
 * 
 * Source: LanguageTool (NOBLE_PRIZE)
 * Category: grammar
 */
export const noblePrizeRule: GrammarRule = {
  id: 'noble-prize',
  name: 'Noble (Nobel) Prize',
  description: 'Did you mean Nobel ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bNoble\b\s+\bPrizes?|laureates?|committee|peace|foundation|lecture\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean Nobel ?',
        suggestions: ["Nobel"],
      });
    }
    
    return issues;
  },
};
