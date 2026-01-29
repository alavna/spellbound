import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Articles: 'most/some of' + plural noun
 * 
 * Source: LanguageTool (MOST_SOME_OF_NNS)
 * Category: grammar
 */
export const mostSomeOfNnsRule: GrammarRule = {
  id: 'most-some-of-nns',
  name: 'Articles: \'most/some of\' + plural noun',
  description: 'After \'\\1 of\', you should use \'the\' (\\1 \\2 the \\3) or simply say \\1 \\3.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmost|some\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'After \'\\1 of\', you should use \'the\' (\\1 \\2 the \\3) or simply say \\1 \\3.',
        suggestions: ["\\1 \\2 the \\3","\\1 \\3"],
      });
    }
    
    return issues;
  },
};
