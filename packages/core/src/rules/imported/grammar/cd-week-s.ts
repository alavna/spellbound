import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Number + 'week's time' (weeks' time)
 * 
 * Source: LanguageTool (CD_WEEK_S)
 * Category: grammar
 */
export const cdWeekSRule: GrammarRule = {
  id: 'cd-week-s',
  name: 'Number + \'week\'s time\' (weeks\' time)',
  description: 'The apostrophe is probably in the wrong place here. Did you mean \\1 \\2s\' \\4?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bweek|month|hour\b\s+'s\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The apostrophe is probably in the wrong place here. Did you mean \\1 \\2s\' \\4?',
        suggestions: ["\\1 \\2s' \\4"],
      });
    }
    
    return issues;
  },
};
