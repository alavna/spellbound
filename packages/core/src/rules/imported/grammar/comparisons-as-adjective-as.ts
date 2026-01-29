import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * comparison 'as ... as' (no comparative/superlative)
 * 
 * Source: LanguageTool (COMPARISONS_AS_ADJECTIVE_AS)
 * Category: grammar
 */
export const comparisonsAsAdjectiveAsRule: GrammarRule = {
  id: 'comparisons-as-adjective-as',
  name: 'comparison \'as ... as\' (no comparative/superlative)',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bas\b\s+\S+\s+\bas\b/gi;
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
