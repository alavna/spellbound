import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Missing preposition: allow (to) do
 * 
 * Source: LanguageTool (ALLOW_TO_DO)
 * Category: grammar
 */
export const allowToDoRule: GrammarRule = {
  id: 'allow-to-do',
  name: 'Missing preposition: allow (to) do',
  description: 'The preposition \'to\' may be missing (allow someone to do something).',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The preposition \'to\' may be missing (allow someone to do something).',
        suggestions: ["to \\3"],
      });
    }
    
    return issues;
  },
};
