import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Missing preposition: explain (to)
 * 
 * Source: LanguageTool (EXPLAIN_TO)
 * Category: grammar
 */
export const explainToRule: GrammarRule = {
  id: 'explain-to',
  name: 'Missing preposition: explain (to)',
  description: 'The preposition \'to\' may be missing (explain something to someone).',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\S+\s+\bhow|th(e|at)|wh(at|ere|ich|y)|(every|any)thing\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The preposition \'to\' may be missing (explain something to someone).',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
