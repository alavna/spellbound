import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * free gift
 * 
 * Source: LanguageTool (FREE_GIFT)
 * Category: style
 */
export const freeGiftRule: GrammarRule = {
  id: 'free-gift',
  name: 'free gift',
  description: 'This phrase is redundant. Consider using .',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfree\b\s+\bgifts?|give-aways?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This phrase is redundant. Consider using .',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
