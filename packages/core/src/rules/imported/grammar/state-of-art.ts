import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * state of art (state of the art, state-of-the-art)
 * 
 * Source: LanguageTool (STATE_OF_ART)
 * Category: grammar
 */
export const stateOfArtRule: GrammarRule = {
  id: 'state-of-art',
  name: 'state of art (state of the art, state-of-the-art)',
  description: 'The phrase \'\\1 \\2 \\3\' is correct if it refers to the condition of art. But, if you mean \'most recent technological development\', use the noun \\1 \\2 the \\3 or the adjective state-of-the-art.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bstate\b\s+\bof\b\s+\bart\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The phrase \'\\1 \\2 \\3\' is correct if it refers to the condition of art. But, if you mean \'most recent technological development\', use the noun \\1 \\2 the \\3 or the adjective state-of-the-art.',
        suggestions: ["\\1 \\2 the \\3","state-of-the-art"],
      });
    }
    
    return issues;
  },
};
