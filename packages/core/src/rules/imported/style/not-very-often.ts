import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * not often, not very often (seldom. rare, rarely)
 * 
 * Source: LanguageTool (NOT_VERY_OFTEN)
 * Category: style
 */
export const notVeryOftenRule: GrammarRule = {
  id: 'not-very-often',
  name: 'not often, not very often (seldom. rare, rarely)',
  description: 'Avoid using \"not\". Did you mean seldom, rare or rarely?',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bnot\b\s+\boften\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Avoid using \"not\". Did you mean seldom, rare or rarely?',
        suggestions: ["seldom","rare","rarely"],
      });
    }
    
    return issues;
  },
};
