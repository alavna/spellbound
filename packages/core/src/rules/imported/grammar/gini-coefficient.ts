import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * gini (Gini) coefficient
 * 
 * Source: LanguageTool (GINI_COEFFICIENT)
 * Category: grammar
 */
export const giniCoefficientRule: GrammarRule = {
  id: 'gini-coefficient',
  name: 'gini (Gini) coefficient',
  description: 'Did you mean Gini \\2 (= statistical measure, \"Gini\" needs to be capitalized)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bgini\b\s+\bcoefficient\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean Gini \\2 (= statistical measure, \"Gini\" needs to be capitalized)?',
        suggestions: ["Gini \\2"],
      });
    }
    
    return issues;
  },
};
