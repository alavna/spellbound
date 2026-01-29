import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * zero-sum gain (game)
 * 
 * Source: LanguageTool (ZERO-SUM_GAIN)
 * Category: grammar
 */
export const zeroSumGainRule: GrammarRule = {
  id: 'zero-sum-gain',
  name: 'zero-sum gain (game)',
  description: 'Did you mean \\1 game?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bzero-sum\b\s+\bgain\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1 game?',
        suggestions: ["\\1 game"],
      });
    }
    
    return issues;
  },
};
