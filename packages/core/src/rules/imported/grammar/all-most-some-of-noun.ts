import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * all/most/some (of) + noun
 * 
 * Source: LanguageTool (ALL_MOST_SOME_OF_NOUN)
 * Category: grammar
 */
export const allMostSomeOfNounRule: GrammarRule = {
  id: 'all-most-some-of-noun',
  name: 'all/most/some (of) + noun',
  description: 'Consider using \\1 or \\1 of the \\3.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ball|some|most\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using \\1 or \\1 of the \\3.',
        suggestions: ["\\1","\\1 of the \\3"],
      });
    }
    
    return issues;
  },
};
