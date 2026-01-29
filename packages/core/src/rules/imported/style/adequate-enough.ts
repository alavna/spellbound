import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * adequate enough (adequate)
 * 
 * Source: LanguageTool (ADEQUATE_ENOUGH)
 * Category: style
 */
export const adequateEnoughRule: GrammarRule = {
  id: 'adequate-enough',
  name: 'adequate enough (adequate)',
  description: 'This phrase might be redundant. Consider using \\1.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\badequate\b\s+\benough\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This phrase might be redundant. Consider using \\1.',
        suggestions: ["\\1"],
      });
    }
    
    return issues;
  },
};
