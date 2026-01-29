import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * February of 2005 (February 2005)
 * 
 * Source: LanguageTool (MONTH_OF_XXXX)
 * Category: grammar
 */
export const monthOfXxxxRule: GrammarRule = {
  id: 'month-of-xxxx',
  name: 'February of 2005 (February 2005)',
  description: 'When specifying a month and year, \'of\' is unnecessary.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /&months;\s+\bof\b\s+\.d\.3,30\./gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'When specifying a month and year, \'of\' is unnecessary.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
