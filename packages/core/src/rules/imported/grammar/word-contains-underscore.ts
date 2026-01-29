import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * A word contains an underscore
 * 
 * Source: LanguageTool (WORD_CONTAINS_UNDERSCORE)
 * Category: grammar
 */
export const wordContainsUnderscoreRule: GrammarRule = {
  id: 'word-contains-underscore',
  name: 'A word contains an underscore',
  description: 'An underscore (_) within a word is atypical (except in technical contexts, nicknames, etc.). Make sure that the word \'\\1\\2\\3\' is correct.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[a-z-]+\s+[a-z-]+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'An underscore (_) within a word is atypical (except in technical contexts, nicknames, etc.). Make sure that the word \'\\1\\2\\3\' is correct.',
        suggestions: ["\\1 \\3","\\1-\\3"],
      });
    }
    
    return issues;
  },
};
