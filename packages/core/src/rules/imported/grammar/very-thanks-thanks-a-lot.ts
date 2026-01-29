import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * very thanks (thanks a lot)
 * 
 * Source: LanguageTool (VERY_THANKS_THANKS_A_LOT)
 * Category: grammar
 */
export const veryThanksThanksALotRule: GrammarRule = {
  id: 'very-thanks-thanks-a-lot',
  name: 'very thanks (thanks a lot)',
  description: 'Did you mean thanks a lot or many thanks?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bvery\b\s+\bthanks\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean thanks a lot or many thanks?',
        suggestions: ["thanks a lot","many thanks"],
      });
    }
    
    return issues;
  },
};
