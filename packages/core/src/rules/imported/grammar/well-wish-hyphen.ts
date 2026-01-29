import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'well wishes'
 * 
 * Source: LanguageTool (WELL_WISH_HYPHEN)
 * Category: grammar
 */
export const wellWishHyphenRule: GrammarRule = {
  id: 'well-wish-hyphen',
  name: 'missing hyphen in \'well wishes\'',
  description: 'The noun \\3-\\4 is spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\S+\s+\bwell\b\s+\bwish(es)?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun \\3-\\4 is spelled with a hyphen.',
        suggestions: ["\\3-\\4"],
      });
    }
    
    return issues;
  },
};
