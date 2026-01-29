import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'clear cut'
 * 
 * Source: LanguageTool (CLEAR_CUT_HYPHEN)
 * Category: grammar
 */
export const clearCutHyphenRule: GrammarRule = {
  id: 'clear-cut-hyphen',
  name: 'missing hyphen in \'clear cut\'',
  description: 'This word is normally spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bclear\b\s+\bcut(ting|s)?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This word is normally spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
