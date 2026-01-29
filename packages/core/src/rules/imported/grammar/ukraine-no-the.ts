import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * ...the situation in the (*omit the*) Ukraine
 * 
 * Source: LanguageTool (UKRAINE_NO_THE)
 * Category: grammar
 */
export const ukraineNoTheRule: GrammarRule = {
  id: 'ukraine-no-the',
  name: '...the situation in the (*omit the*) Ukraine',
  description: 'Since becoming an independent nation in 1991, the article \'the\' has been dropped from the name of the country of Ukraine.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthe\b\s+\bUkraine\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Since becoming an independent nation in 1991, the article \'the\' has been dropped from the name of the country of Ukraine.',
        suggestions: ["Ukraine"],
      });
    }
    
    return issues;
  },
};
