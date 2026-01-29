import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * which vs wish
 * 
 * Source: LanguageTool (WHICH_WISH)
 * Category: grammar
 */
export const whichWishRule: GrammarRule = {
  id: 'which-wish',
  name: 'which vs wish',
  description: 'Did you mean wish?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bI|we\b\s+\bwhich\b\s+\byou|them|him\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean wish?',
        suggestions: ["wish"],
      });
    }
    
    return issues;
  },
};
