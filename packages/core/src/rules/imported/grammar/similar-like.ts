import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * similar like (to)
 * 
 * Source: LanguageTool (SIMILAR_LIKE)
 * Category: grammar
 */
export const similarLikeRule: GrammarRule = {
  id: 'similar-like',
  name: 'similar like (to)',
  description: 'The correct preposition to use with \"similar\" is \"to\".',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsimilar\b\s+\blike\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The correct preposition to use with \"similar\" is \"to\".',
        suggestions: ["\\1 to"],
      });
    }
    
    return issues;
  },
};
