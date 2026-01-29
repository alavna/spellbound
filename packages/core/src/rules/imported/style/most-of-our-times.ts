import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Most of our times (time)
 * 
 * Source: LanguageTool (MOST_OF_OUR_TIMES)
 * Category: style
 */
export const mostOfOurTimesRule: GrammarRule = {
  id: 'most-of-our-times',
  name: 'Most of our times (time)',
  description: 'Did you mean the more common phrase \\2 \\3 \\4 ?',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bmost\b\s+\bof\b\s+\by?our|my|his|her|their|its\b\s+\btimes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the more common phrase \\2 \\3 \\4 ?',
        suggestions: ["\\2 \\3 \\4"],
      });
    }
    
    return issues;
  },
};
