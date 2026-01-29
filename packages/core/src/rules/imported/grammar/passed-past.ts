import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * to walk passed (past)
 * 
 * Source: LanguageTool (PASSED_PAST)
 * Category: grammar
 */
export const passedPastRule: GrammarRule = {
  id: 'passed-past',
  name: 'to walk passed (past)',
  description: 'Did you mean past? \'passed\' is a form of the verb \'pass\'.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bpassed\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean past? \'passed\' is a form of the verb \'pass\'.',
        suggestions: ["past"],
      });
    }
    
    return issues;
  },
};
