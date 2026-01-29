import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * in order to (to)
 * 
 * Source: LanguageTool (IN_ORDER_TO)
 * Category: style
 */
export const inOrderToRule: GrammarRule = {
  id: 'in-order-to',
  name: 'in order to (to)',
  description: 'Did you mean to?',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin\b\s+\border\b\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean to?',
        suggestions: ["to"],
      });
    }
    
    return issues;
  },
};
