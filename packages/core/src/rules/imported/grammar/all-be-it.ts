import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * all be it (albeit)
 * 
 * Source: LanguageTool (ALL_BE_IT)
 * Category: grammar
 */
export const allBeItRule: GrammarRule = {
  id: 'all-be-it',
  name: 'all be it (albeit)',
  description: 'Did you mean albeit (=although)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ball\b\s+\bbe\b\s+\bit\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean albeit (=although)?',
        suggestions: ["albeit"],
      });
    }
    
    return issues;
  },
};
