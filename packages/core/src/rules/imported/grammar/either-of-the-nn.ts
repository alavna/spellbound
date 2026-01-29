import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * either of the car (cars)
 * 
 * Source: LanguageTool (EITHER_OF_THE_NN)
 * Category: grammar
 */
export const eitherOfTheNnRule: GrammarRule = {
  id: 'either-of-the-nn',
  name: 'either of the car (cars)',
  description: 'The pronoun \"\\1\" requires the plural noun form:',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bn?either\b\s+\bof\b\s+\bthe\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The pronoun \"\\1\" requires the plural noun form:',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
