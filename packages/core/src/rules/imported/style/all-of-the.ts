import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * all of the (all the)
 * 
 * Source: LanguageTool (ALL_OF_THE)
 * Category: style
 */
export const allOfTheRule: GrammarRule = {
  id: 'all-of-the',
  name: 'all of the (all the)',
  description: 'Consider removing \"of\" to be more concise',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ball\b\s+\bof\b\s+\bthe\b\s+(?!\bsudden|above|many\b)\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider removing \"of\" to be more concise',
        suggestions: ["\\1 \\3"],
      });
    }
    
    return issues;
  },
};
