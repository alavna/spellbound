import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * stock and trade (stock in trade)
 * 
 * Source: LanguageTool (STOCK_AND_TRADE)
 * Category: grammar
 */
export const stockAndTradeRule: GrammarRule = {
  id: 'stock-and-trade',
  name: 'stock and trade (stock in trade)',
  description: 'Did you mean stock in trade?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bstock\b\s+\band\b\s+\btrade\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean stock in trade?',
        suggestions: ["stock in trade"],
      });
    }
    
    return issues;
  },
};
