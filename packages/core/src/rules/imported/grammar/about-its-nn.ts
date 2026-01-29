import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * about its NN (possessive)
 * 
 * Source: LanguageTool (ABOUT_ITS_NN)
 * Category: grammar
 */
export const aboutItsNnRule: GrammarRule = {
  id: 'about-its-nn',
  name: 'about its NN (possessive)',
  description: '&its;',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbe|about|above|across|against|along|among|around|at|behind|by|for|from|had|in|near|of|on|over|through|to|towards|under|upon|with|without\b\s+\bit\b\s+'s\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '&its;',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
