import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * flee (flea) market
 * 
 * Source: LanguageTool (FLEE_MARKET)
 * Category: grammar
 */
export const fleeMarketRule: GrammarRule = {
  id: 'flee-market',
  name: 'flee (flea) market',
  description: 'Did you mean flea \\2 (= street market)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bflee\b\s+\bmarkets?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean flea \\2 (= street market)?',
        suggestions: ["flea \\2"],
      });
    }
    
    return issues;
  },
};
