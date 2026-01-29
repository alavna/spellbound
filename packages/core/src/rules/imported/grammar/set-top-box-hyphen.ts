import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'set top box'
 * 
 * Source: LanguageTool (SET_TOP_BOX_HYPHEN)
 * Category: grammar
 */
export const setTopBoxHyphenRule: GrammarRule = {
  id: 'set-top-box-hyphen',
  name: 'missing hyphen in \'set top box\'',
  description: 'When \\1-\\2 is used as a modifier, it is usually spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bset\b\s+\btop\b\s+\bbox(es)?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'When \\1-\\2 is used as a modifier, it is usually spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
