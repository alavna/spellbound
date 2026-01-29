import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * sufficient enough → sufficient
 * 
 * Source: LanguageTool (SUFFICIENT_ENOUGH)
 * Category: style
 */
export const sufficientEnoughRule: GrammarRule = {
  id: 'sufficient-enough',
  name: 'sufficient enough → sufficient',
  description: '\'Sufficient enough\' is redundant. Consider using only sufficient.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsufficient\b\s+\benough\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\'Sufficient enough\' is redundant. Consider using only sufficient.',
        suggestions: ["sufficient"],
      });
    }
    
    return issues;
  },
};
