import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * must be do (done)
 * 
 * Source: LanguageTool (MUST_BE_DO)
 * Category: grammar
 */
export const mustBeDoRule: GrammarRule = {
  id: 'must-be-do',
  name: 'must be do (done)',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmust|will|c(an|ould)\s+\bbe\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean ?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
