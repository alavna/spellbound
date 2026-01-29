import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * possessive apostrophe for noun ending with 'x'
 * 
 * Source: LanguageTool (NOUN_ENDING_WITH_X_POSSESSIVE_APOSTROPHE)
 * Category: grammar
 */
export const nounEndingWithXPossessiveApostropheRule: GrammarRule = {
  id: 'noun-ending-with-x-possessive-apostrophe',
  name: 'possessive apostrophe for noun ending with \'x\'',
  description: 'Nouns ending with \'x\' require a possessive \'s\' after the apostrophe.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /['’]\s+\S+\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Nouns ending with \'x\' require a possessive \'s\' after the apostrophe.',
        suggestions: ["\\1\\2s"],
      });
    }
    
    return issues;
  },
};
