import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * price sensibility (sensitivity)
 * 
 * Source: LanguageTool (PRICE_SENSIBILITY)
 * Category: grammar
 */
export const priceSensibilityRule: GrammarRule = {
  id: 'price-sensibility',
  name: 'price sensibility (sensitivity)',
  description: 'Did you mean price sensitivity (= degree to which the price of a product affects consumers\' purchasing behaviors)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bprice\b\s+\bsensibility\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean price sensitivity (= degree to which the price of a product affects consumers\' purchasing behaviors)?',
        suggestions: ["price sensitivity"],
      });
    }
    
    return issues;
  },
};
