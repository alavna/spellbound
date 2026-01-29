import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * queens (Queens)
 * 
 * Source: LanguageTool (IN_QUEENS)
 * Category: grammar
 */
export const inQueensRule: GrammarRule = {
  id: 'in-queens',
  name: 'queens (Queens)',
  description: 'Capitalize this word if you mean the New York borough.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin|from|to|at\b\s+\bqueens\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Capitalize this word if you mean the New York borough.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
