import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * all for not (all for naught)
 * 
 * Source: LanguageTool (ALL_FOR_NOT)
 * Category: grammar
 */
export const allForNotRule: GrammarRule = {
  id: 'all-for-not',
  name: 'all for not (all for naught)',
  description: 'Did you mean all for naught (=all for nothing)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ball\b\s+\bfor\b\s+\bnot|knot\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean all for naught (=all for nothing)?',
        suggestions: ["all for naught"],
      });
    }
    
    return issues;
  },
};
