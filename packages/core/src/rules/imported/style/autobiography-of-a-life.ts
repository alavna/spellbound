import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * autobiography of a life (autobiography)
 * 
 * Source: LanguageTool (AUTOBIOGRAPHY_OF_A_LIFE)
 * Category: style
 */
export const autobiographyOfALifeRule: GrammarRule = {
  id: 'autobiography-of-a-life',
  name: 'autobiography of a life (autobiography)',
  description: 'Consider using \\1 or story \\2 \\3 \\4 instead.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bautobiography\b\s+\bof\b\s+\ba\b\s+\blife\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using \\1 or story \\2 \\3 \\4 instead.',
        suggestions: ["\\1","story \\2 \\3 \\4"],
      });
    }
    
    return issues;
  },
};
