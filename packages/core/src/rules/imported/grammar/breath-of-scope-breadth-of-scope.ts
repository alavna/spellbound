import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 'breath of scope' (breadth of scope)
 * 
 * Source: LanguageTool (BREATH_OF_SCOPE_BREADTH_OF_SCOPE)
 * Category: grammar
 */
export const breathOfScopeBreadthOfScopeRule: GrammarRule = {
  id: 'breath-of-scope-breadth-of-scope',
  name: '\'breath of scope\' (breadth of scope)',
  description: 'Did you mean breadth?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbreath\b\s+\bof\b\s+\bscope\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean breadth?',
        suggestions: ["breadth"],
      });
    }
    
    return issues;
  },
};
