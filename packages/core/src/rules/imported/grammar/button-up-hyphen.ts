import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'run on'
 * 
 * Source: LanguageTool (BUTTON_UP_HYPHEN)
 * Category: grammar
 */
export const buttonUpHyphenRule: GrammarRule = {
  id: 'button-up-hyphen',
  name: 'missing hyphen in \'run on\'',
  description: 'The adjective \\3-\\4 is spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bbutton\b\s+\bup\b\s+\bt-?shirts?|shirts?|sweaters?|sweat-?shirts?|tanks?|dress(es)?|blouses?|tops?|vests?|jackets?|cardigans?|jeans?|trousers?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The adjective \\3-\\4 is spelled with a hyphen.',
        suggestions: ["\\3-\\4"],
      });
    }
    
    return issues;
  },
};
