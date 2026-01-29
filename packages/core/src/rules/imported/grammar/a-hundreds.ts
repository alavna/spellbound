import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * a hundreds (hundred)
 * 
 * Source: LanguageTool (A_HUNDREDS)
 * Category: grammar
 */
export const aHundredsRule: GrammarRule = {
  id: 'a-hundreds',
  name: 'a hundreds (hundred)',
  description: 'Possible agreement error. Consider using: .',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ba|one\b\s+\bhundreds|thousands|[bm]illions|trillions|quadrillions\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Possible agreement error. Consider using: .',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
