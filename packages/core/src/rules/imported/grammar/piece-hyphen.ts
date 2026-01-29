import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in '125 piece puzzle'
 * 
 * Source: LanguageTool (PIECE_HYPHEN)
 * Category: grammar
 */
export const pieceHyphenRule: GrammarRule = {
  id: 'piece-hyphen',
  name: 'missing hyphen in \'125 piece puzzle\'',
  description: 'When \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bpiece\b\s+\S+\s+\bpuzzles?|jigsaw|wardrobe|canvas|set|outfit|suit|luggage|bands?|quantit(y|ies)|orchestra|units?|kits?|constructions?|systems?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'When \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
