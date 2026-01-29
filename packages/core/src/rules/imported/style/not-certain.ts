import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * not certain (uncertain)
 * 
 * Source: LanguageTool (NOT_CERTAIN)
 * Category: style
 */
export const notCertainRule: GrammarRule = {
  id: 'not-certain',
  name: 'not certain (uncertain)',
  description: 'Avoid using \"not\". Did you mean uncertain?',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bnot\b\s+\bcertain\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Avoid using \"not\". Did you mean uncertain?',
        suggestions: ["uncertain"],
      });
    }
    
    return issues;
  },
};
