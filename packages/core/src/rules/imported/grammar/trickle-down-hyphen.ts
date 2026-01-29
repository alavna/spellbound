import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'trickle down'
 * 
 * Source: LanguageTool (TRICKLE_DOWN_HYPHEN)
 * Category: grammar
 */
export const trickleDownHyphenRule: GrammarRule = {
  id: 'trickle-down-hyphen',
  name: 'missing hyphen in \'trickle down\'',
  description: 'It appears that a hyphen is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\btrickle\b\s+\bdown\b\s+\beconom(y|ies)|effects?|economics|spendings?|benefits?|theor(y|ies)|technolog(y|ies)|methods?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that a hyphen is missing.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
