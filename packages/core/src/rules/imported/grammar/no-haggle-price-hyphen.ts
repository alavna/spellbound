import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * no haggle (no-haggle)
 * 
 * Source: LanguageTool (NO_HAGGLE_PRICE_HYPHEN)
 * Category: grammar
 */
export const noHagglePriceHyphenRule: GrammarRule = {
  id: 'no-haggle-price-hyphen',
  name: 'no haggle (no-haggle)',
  description: 'It appears that a hyphen is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bno\b\s+\bhaggle\b\s+\bprices?|pricings?|cars?|dealerships?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that a hyphen is missing.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
