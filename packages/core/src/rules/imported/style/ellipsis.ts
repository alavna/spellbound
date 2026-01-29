import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Smart ellipsis (…)
 * 
 * Source: LanguageTool (ELLIPSIS)
 * Category: style
 */
export const ellipsisRule: GrammarRule = {
  id: 'ellipsis',
  name: 'Smart ellipsis (…)',
  description: 'Consider using the typographical ellipsis character here instead.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\.\s+\.\s+\./gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using the typographical ellipsis character here instead.',
        suggestions: ["…"],
      });
    }
    
    return issues;
  },
};
