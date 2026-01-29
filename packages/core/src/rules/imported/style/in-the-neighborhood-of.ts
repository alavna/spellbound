import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * in the neighborhood of (about)
 * 
 * Source: LanguageTool (IN_THE_NEIGHBORHOOD_OF)
 * Category: style
 */
export const inTheNeighborhoodOfRule: GrammarRule = {
  id: 'in-the-neighborhood-of',
  name: 'in the neighborhood of (about)',
  description: 'Can be used as almost, approximately, more or less, around. Often about.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin\b\s+\bthe\b\s+\bneighborhood\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Can be used as almost, approximately, more or less, around. Often about.',
        suggestions: ["almost","approximately","more or less","around","about"],
      });
    }
    
    return issues;
  },
};
