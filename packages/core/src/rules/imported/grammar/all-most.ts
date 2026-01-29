import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * all most (almost)
 * 
 * Source: LanguageTool (ALL_MOST)
 * Category: grammar
 */
export const allMostRule: GrammarRule = {
  id: 'all-most',
  name: 'all most (almost)',
  description: 'Did you mean almost?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ball\b\s+\bmost\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean almost?',
        suggestions: ["almost"],
      });
    }
    
    return issues;
  },
};
