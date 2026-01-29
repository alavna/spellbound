import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * In the recent years (in recent years)
 * 
 * Source: LanguageTool (IN_THE_RECENT_YEARS_IN_RECENT_YEARS)
 * Category: grammar
 */
export const inTheRecentYearsInRecentYearsRule: GrammarRule = {
  id: 'in-the-recent-years-in-recent-years',
  name: 'In the recent years (in recent years)',
  description: 'The definite article \"the\" is not necessary in this context.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin\b\s+\bthe\b\s+\brecent\b\s+\byears\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The definite article \"the\" is not necessary in this context.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
