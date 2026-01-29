import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Comma after a month
 * 
 * Source: LanguageTool (COMMA_AFTER_A_MONTH)
 * Category: grammar
 */
export const commaAfterAMonthRule: GrammarRule = {
  id: 'comma-after-a-month',
  name: 'Comma after a month',
  description: 'When specifying a month and year, the comma is unnecessary.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /&months;\s+,\s+\.d\.3,30\./gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'When specifying a month and year, the comma is unnecessary.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
