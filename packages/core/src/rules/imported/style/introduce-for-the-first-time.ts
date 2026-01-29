import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * introduce for the first time (introduce)
 * 
 * Source: LanguageTool (INTRODUCE_FOR_THE_FIRST_TIME)
 * Category: style
 */
export const introduceForTheFirstTimeRule: GrammarRule = {
  id: 'introduce-for-the-first-time',
  name: 'introduce for the first time (introduce)',
  description: 'Consider using \\1.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bfor\b\s+\bthe\b\s+\bfirst\b\s+\btime\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using \\1.',
        suggestions: ["\\1"],
      });
    }
    
    return issues;
  },
};
