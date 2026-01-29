import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * He has much (a lot of) money
 * 
 * Source: LanguageTool (MUCH_MONEY)
 * Category: grammar
 */
export const muchMoneyRule: GrammarRule = {
  id: 'much-money',
  name: 'He has much (a lot of) money',
  description: 'In this context, a lot of or so much is more likely.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmuch\b\s+\bmoney\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'In this context, a lot of or so much is more likely.',
        suggestions: ["a lot of","so much"],
      });
    }
    
    return issues;
  },
};
