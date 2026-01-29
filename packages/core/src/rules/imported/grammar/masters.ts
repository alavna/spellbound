import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * masters (master’s) degree/dissertation/thesis
 * 
 * Source: LanguageTool (MASTERS)
 * Category: grammar
 */
export const mastersRule: GrammarRule = {
  id: 'masters',
  name: 'masters (master’s) degree/dissertation/thesis',
  description: 'For an academic degree, use .',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmasters\b\s+\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'For an academic degree, use .',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
