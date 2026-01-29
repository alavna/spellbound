import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Missing comma between day of month and year
 * 
 * Source: LanguageTool (MISSING_COMMA_BETWEEN_DAY_AND_YEAR)
 * Category: grammar
 */
export const missingCommaBetweenDayAndYearRule: GrammarRule = {
  id: 'missing-comma-between-day-and-year',
  name: 'Missing comma between day of month and year',
  description: 'Commas set off the year in a month-day-year date.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /&months;\s+[0123]?[0-9]\s+[0-9]{4}/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Commas set off the year in a month-day-year date.',
        suggestions: ["\\1 \\2,"],
      });
    }
    
    return issues;
  },
};
