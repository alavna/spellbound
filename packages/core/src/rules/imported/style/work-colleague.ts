import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * work colleague (colleague)
 * 
 * Source: LanguageTool (WORK_COLLEAGUE)
 * Category: style
 */
export const workColleagueRule: GrammarRule = {
  id: 'work-colleague',
  name: 'work colleague (colleague)',
  description: 'Consider using \\2.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwork\b\s+\bcolleague\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using \\2.',
        suggestions: ["\\2"],
      });
    }
    
    return issues;
  },
};
