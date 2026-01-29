import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Potentially missing comma after year
 * 
 * Source: LanguageTool (MISSING_COMMA_AFTER_YEAR)
 * Category: style
 */
export const missingCommaAfterYearRule: GrammarRule = {
  id: 'missing-comma-after-year',
  name: 'Potentially missing comma after year',
  description: 'Some style guides suggest that commas should set off the year in a month-day-year date.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /&months;\s+[0123]?[0-9]\s+[0-9]{4}\s+[a-z]+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Some style guides suggest that commas should set off the year in a month-day-year date.',
        suggestions: ["\\4,"],
      });
    }
    
    return issues;
  },
};
