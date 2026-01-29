import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * stale mate (stalemate)
 * 
 * Source: LanguageTool (MATE_COMPOUNDS)
 * Category: grammar
 */
export const mateCompoundsRule: GrammarRule = {
  id: 'mate-compounds',
  name: 'stale mate (stalemate)',
  description: 'The noun is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bstale|room|class|school|seat|work|cell|ship|team|litter\b\s+\bmates?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun is spelled as one word.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
