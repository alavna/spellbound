import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * euclidean (Euclidean) distance
 * 
 * Source: LanguageTool (EUCLIDEAN_CAPITALIZATION)
 * Category: grammar
 */
export const euclideanCapitalizationRule: GrammarRule = {
  id: 'euclidean-capitalization',
  name: 'euclidean (Euclidean) distance',
  description: 'The adjective \"Euclidean\" is typically capitalized.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\beuclidean\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The adjective \"Euclidean\" is typically capitalized.',
        suggestions: ["Euclidean"],
      });
    }
    
    return issues;
  },
};
