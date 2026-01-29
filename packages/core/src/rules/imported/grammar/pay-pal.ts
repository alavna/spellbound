import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * PayPal
 * 
 * Source: LanguageTool (PAY_PAL)
 * Category: grammar
 */
export const payPalRule: GrammarRule = {
  id: 'pay-pal',
  name: 'PayPal',
  description: 'The name (= payment provider) is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bPay\b\s+\bPal\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The name (= payment provider) is spelled as one word.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
