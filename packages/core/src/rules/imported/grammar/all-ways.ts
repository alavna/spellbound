import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * all ways (always)
 * 
 * Source: LanguageTool (ALL_WAYS)
 * Category: grammar
 */
export const allWaysRule: GrammarRule = {
  id: 'all-ways',
  name: 'all ways (always)',
  description: 'Did you mean always?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ball\b\s+\bways\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean always?',
        suggestions: ["always"],
      });
    }
    
    return issues;
  },
};
