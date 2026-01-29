import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * commute back and forth (commute)
 * 
 * Source: LanguageTool (COMMUTE_BACK_AND_FORTH)
 * Category: style
 */
export const commuteBackAndForthRule: GrammarRule = {
  id: 'commute-back-and-forth',
  name: 'commute back and forth (commute)',
  description: 'Consider using \\1.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bback\b\s+\band\b\s+\bforth\b/gi;
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
