import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * windows-based (Windows-based)
 * 
 * Source: LanguageTool (NNP_BASED)
 * Category: grammar
 */
export const nnpBasedRule: GrammarRule = {
  id: 'nnp-based',
  name: 'windows-based (Windows-based)',
  description: 'The proper noun in this adjective needs to be capitalized.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /(windows|linux|chromium|firefox|unix|java|android|skype|excel|google|zoom|slack|chevy|twitter|photoshop|dutch|french|france|turkey|python|ruby|swift|go|europe|germany|german|denmark|poland|austria|swiss|belgium|london|boston|chicago|berlin|hamburg|munich|vienna|amsterdam|mexico|mexican|toronto|canada|york|angeles|diego|detroit|jose|paso|california|florida|texas|seattle|carolina|francisco)-based\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The proper noun in this adjective needs to be capitalized.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
