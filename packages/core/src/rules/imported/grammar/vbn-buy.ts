import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * buy (by)
 * 
 * Source: LanguageTool (VBN_BUY)
 * Category: grammar
 */
export const vbnBuyRule: GrammarRule = {
  id: 'vbn-buy',
  name: 'buy (by)',
  description: 'Did you mean by or to buy?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bis|was|are|were\b\s+\S+\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean by or to buy?',
        suggestions: ["by","to buy"],
      });
    }
    
    return issues;
  },
};
