import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * calender (calendar)
 * 
 * Source: LanguageTool (CALENDER)
 * Category: grammar
 */
export const calenderRule: GrammarRule = {
  id: 'calender',
  name: 'calender (calendar)',
  description: 'Did you mean calendar, a system of organizing days? A \'calender\' is a machine.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcalender\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean calendar, a system of organizing days? A \'calender\' is a machine.',
        suggestions: ["calendar"],
      });
    }
    
    return issues;
  },
};
