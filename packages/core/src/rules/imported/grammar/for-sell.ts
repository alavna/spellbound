import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * for sell (for sale)
 * 
 * Source: LanguageTool (FOR_SELL)
 * Category: grammar
 */
export const forSellRule: GrammarRule = {
  id: 'for-sell',
  name: 'for sell (for sale)',
  description: 'Did you mean for sale?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfor\b\s+\bsell\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean for sale?',
        suggestions: ["for sale"],
      });
    }
    
    return issues;
  },
};
