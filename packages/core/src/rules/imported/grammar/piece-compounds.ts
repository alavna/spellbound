import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * ear piece (earpiece)
 * 
 * Source: LanguageTool (PIECE_COMPOUNDS)
 * Category: grammar
 */
export const pieceCompoundsRule: GrammarRule = {
  id: 'piece-compounds',
  name: 'ear piece (earpiece)',
  description: 'The word \\1 is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Mm]aster|[Mm]outh|[Cc]entre|[Cc]enter|[Ee]ar|[Tt]ail|[Ss]how|[Hh]air|[Ee]ye\b\s+\bpieces?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word \\1 is spelled as one word.',
        suggestions: ["\\1"],
      });
    }
    
    return issues;
  },
};
