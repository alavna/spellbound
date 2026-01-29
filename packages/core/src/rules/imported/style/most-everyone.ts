import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * most (almost) every
 * 
 * Source: LanguageTool (MOST_EVERYONE)
 * Category: style
 */
export const mostEveryoneRule: GrammarRule = {
  id: 'most-everyone',
  name: 'most (almost) every',
  description: 'Avoid the colloquial phrase \'\\1 \\2\' in formal writing. Use almost \\2 instead.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmost(ly)?\s+(any|every)(body|one|where)?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Avoid the colloquial phrase \'\\1 \\2\' in formal writing. Use almost \\2 instead.',
        suggestions: ["almost \\2"],
      });
    }
    
    return issues;
  },
};
