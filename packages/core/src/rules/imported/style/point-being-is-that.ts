import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * point being is that (point is that/point being that)
 * 
 * Source: LanguageTool (POINT_BEING_IS_THAT)
 * Category: style
 */
export const pointBeingIsThatRule: GrammarRule = {
  id: 'point-being-is-that',
  name: 'point being is that (point is that/point being that)',
  description: 'Consider using \\1 \\3 \\4 or \\1 \\2 \\4.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bpoint\b\s+\bbeing\b\s+\bis\b\s+\bthat\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using \\1 \\3 \\4 or \\1 \\2 \\4.',
        suggestions: ["\\1 \\3 \\4","\\1 \\2 \\4"],
      });
    }
    
    return issues;
  },
};
