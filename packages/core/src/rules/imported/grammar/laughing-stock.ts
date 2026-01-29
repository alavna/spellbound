import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * laughing stock (laughingstock)
 * 
 * Source: LanguageTool (LAUGHING_STOCK)
 * Category: grammar
 */
export const laughingStockRule: GrammarRule = {
  id: 'laughing-stock',
  name: 'laughing stock (laughingstock)',
  description: 'Did you mean laughingstock?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\blaughing\b\s+\bstock\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean laughingstock?',
        suggestions: ["laughingstock"],
      });
    }
    
    return issues;
  },
};
