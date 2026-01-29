import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * year end (in) and year out
 * 
 * Source: LanguageTool (YEAR_END_AND_YEAR_OUT)
 * Category: grammar
 */
export const yearEndAndYearOutRule: GrammarRule = {
  id: 'year-end-and-year-out',
  name: 'year end (in) and year out',
  description: 'Did you mean year in and year out?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byear\b\s+\bend\b\s+\band\b\s+\byear\b\s+\bout\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean year in and year out?',
        suggestions: ["year in and year out"],
      });
    }
    
    return issues;
  },
};
