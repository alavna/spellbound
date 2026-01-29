import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * downpayment (down payment)
 * 
 * Source: LanguageTool (DOWNPAYMENT)
 * Category: grammar
 */
export const downpaymentRule: GrammarRule = {
  id: 'downpayment',
  name: 'downpayment (down payment)',
  description: 'Did you mean down payment?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdownpayment\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean down payment?',
        suggestions: ["down payment"],
      });
    }
    
    return issues;
  },
};
