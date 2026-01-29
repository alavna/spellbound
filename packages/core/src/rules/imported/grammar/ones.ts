import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * ones (one's)
 * 
 * Source: LanguageTool (ONES)
 * Category: grammar
 */
export const onesRule: GrammarRule = {
  id: 'ones',
  name: 'ones (one\'s)',
  description: 'Did you mean one\'s?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bones\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean one\'s?',
        suggestions: ["one's"],
      });
    }
    
    return issues;
  },
};
