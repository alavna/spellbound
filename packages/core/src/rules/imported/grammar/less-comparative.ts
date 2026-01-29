import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 'less' before comparative or superlative
 * 
 * Source: LanguageTool (LESS_COMPARATIVE)
 * Category: grammar
 */
export const lessComparativeRule: GrammarRule = {
  id: 'less-comparative',
  name: '\'less\' before comparative or superlative',
  description: 'Non-standard use of the comparative or superlative. Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bless\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Non-standard use of the comparative or superlative. Did you mean ?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
