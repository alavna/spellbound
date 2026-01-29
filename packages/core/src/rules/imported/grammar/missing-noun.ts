import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Missing noun: 'The is the'
 * 
 * Source: LanguageTool (MISSING_NOUN)
 * Category: grammar
 */
export const missingNounRule: GrammarRule = {
  id: 'missing-noun',
  name: 'Missing noun: \'The is the\'',
  description: 'Please check whether a word is missing between \'\\1\' and \'\\2\' or whether \'\\1\' is the correct determiner.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthe\b\s+\byes\b\s+\bthe|an?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Please check whether a word is missing between \'\\1\' and \'\\2\' or whether \'\\1\' is the correct determiner.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
