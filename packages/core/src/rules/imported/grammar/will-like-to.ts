import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 'will like to' (would like to)
 * 
 * Source: LanguageTool (WILL_LIKE_TO)
 * Category: grammar
 */
export const willLikeToRule: GrammarRule = {
  id: 'will-like-to',
  name: '\'will like to\' (would like to)',
  description: 'Did you mean would?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwill\b\s+\blike\b\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean would?',
        suggestions: ["would"],
      });
    }
    
    return issues;
  },
};
