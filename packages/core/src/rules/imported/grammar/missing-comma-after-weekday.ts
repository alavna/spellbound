import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Missing comma after weekday
 * 
 * Source: LanguageTool (MISSING_COMMA_AFTER_WEEKDAY)
 * Category: grammar
 */
export const missingCommaAfterWeekdayRule: GrammarRule = {
  id: 'missing-comma-after-weekday',
  name: 'Missing comma after weekday',
  description: 'Commas set off the month in a weekday-month-day date.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /&weekdays;\s+&months;\s+[0123]?[0-9](st|nd|rd|th)?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Commas set off the month in a weekday-month-day date.',
        suggestions: ["\\1,"],
      });
    }
    
    return issues;
  },
};
