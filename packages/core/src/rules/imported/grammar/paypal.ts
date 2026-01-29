import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * PayPal
 * 
 * Source: LanguageTool (PAYPAL)
 * Category: grammar
 */
export const paypalRule: GrammarRule = {
  id: 'paypal',
  name: 'PayPal',
  description: 'The official name of this payment provider is spelled with two capital \"P\".',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bPaypal|paypal|payPal\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The official name of this payment provider is spelled with two capital \"P\".',
        suggestions: ["PayPal"],
      });
    }
    
    return issues;
  },
};
