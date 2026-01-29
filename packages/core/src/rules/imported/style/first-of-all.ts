import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * first of all (first)
 * 
 * Source: LanguageTool (FIRST_OF_ALL)
 * Category: style
 */
export const firstOfAllRule: GrammarRule = {
  id: 'first-of-all',
  name: 'first of all (first)',
  description: 'Often, this adverbial phrase is redundant. Consider using an alternative.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfirst\b\s+\bof\b\s+\ball\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Often, this adverbial phrase is redundant. Consider using an alternative.',
        suggestions: ["first","firstly","foremost"],
      });
    }
    
    return issues;
  },
};
