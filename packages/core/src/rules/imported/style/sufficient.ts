import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * sufficient (enough)
 * 
 * Source: LanguageTool (SUFFICIENT)
 * Category: style
 */
export const sufficientRule: GrammarRule = {
  id: 'sufficient',
  name: 'sufficient (enough)',
  description: 'Use enough.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsufficient\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Use enough.',
        suggestions: ["enough"],
      });
    }
    
    return issues;
  },
};
