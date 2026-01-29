import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * money is no option (money is no object)
 * 
 * Source: LanguageTool (MONEY_IS_NO_OPTION)
 * Category: grammar
 */
export const moneyIsNoOptionRule: GrammarRule = {
  id: 'money-is-no-option',
  name: 'money is no option (money is no object)',
  description: 'Did you mean money is no object (=money is no obstacle, cost what it may)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmoney\b\s+\bis\b\s+\bno\b\s+\boption\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean money is no object (=money is no obstacle, cost what it may)?',
        suggestions: ["money is no object"],
      });
    }
    
    return issues;
  },
};
