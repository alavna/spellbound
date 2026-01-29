import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * wrong preposition: 'exception PREPOSITION the rule' (exception to the rule)
 * 
 * Source: LanguageTool (EXCEPTION_PREPOSITION_THE_RULE)
 * Category: grammar
 */
export const exceptionPrepositionTheRuleRule: GrammarRule = {
  id: 'exception-preposition-the-rule',
  name: 'wrong preposition: \'exception PREPOSITION the rule\' (exception to the rule)',
  description: 'Did you mean \\1 to?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\S+\s+\S+\s+\brules?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1 to?',
        suggestions: ["\\1 to"],
      });
    }
    
    return issues;
  },
};
