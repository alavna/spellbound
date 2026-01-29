import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * wrong order of words
 * 
 * Source: LanguageTool (ORDER_OF_WORDS_WITH_NOT)
 * Category: grammar
 */
export const orderOfWordsWithNotRule: GrammarRule = {
  id: 'order-of-words-with-not',
  name: 'wrong order of words',
  description: 'Please check the order of words and the punctuation of this sentence.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcan|ca|have|should|could|will|wo|won|may|might\b\s+\bnot|n't\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Please check the order of words and the punctuation of this sentence.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
