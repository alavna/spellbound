import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Numbers in words
 * 
 * Source: LanguageTool (NUMBERS_IN_WORDS)
 * Category: grammar
 */
export const numbersInWordsRule: GrammarRule = {
  id: 'numbers-in-words',
  name: 'Numbers in words',
  description: 'Possible typo detected.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[\.{Ll}\.{Lu}]\.{Ll}*[0-9]\.{Ll}+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Possible typo detected.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
