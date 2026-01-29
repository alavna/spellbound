import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * route (root) of the problem
 * 
 * Source: LanguageTool (ROUTE_OF_THE_PROBLEM)
 * Category: grammar
 */
export const routeOfTheProblemRule: GrammarRule = {
  id: 'route-of-the-problem',
  name: 'route (root) of the problem',
  description: 'Did you mean root (=source, cause)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\broutes?\s+\bof\b\s+\bthe\b\s+\bproblems?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean root (=source, cause)?',
        suggestions: ["root"],
      });
    }
    
    return issues;
  },
};
