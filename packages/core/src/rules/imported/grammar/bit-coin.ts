import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Bitcoin
 * 
 * Source: LanguageTool (BIT_COIN)
 * Category: grammar
 */
export const bitCoinRule: GrammarRule = {
  id: 'bit-coin',
  name: 'Bitcoin',
  description: 'Did you mean (= cryptocurrency)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbit|lite\b\s+\bcoins?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean (= cryptocurrency)?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
