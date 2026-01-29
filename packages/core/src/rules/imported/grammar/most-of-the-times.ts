import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * most of the times (time)
 * 
 * Source: LanguageTool (MOST_OF_THE_TIMES)
 * Category: grammar
 */
export const mostOfTheTimesRule: GrammarRule = {
  id: 'most-of-the-times',
  name: 'most of the times (time)',
  description: 'Consider using most of the time if you mean \"usually\" or \"very often\".',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmost\b\s+\bof\b\s+\bthe\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using most of the time if you mean \"usually\" or \"very often\".',
        suggestions: ["most of the time"],
      });
    }
    
    return issues;
  },
};
