import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * many kinds of + singular noun
 * 
 * Source: LanguageTool (MANY_KINDS_OF)
 * Category: grammar
 */
export const manyKindsOfRule: GrammarRule = {
  id: 'many-kinds-of',
  name: 'many kinds of + singular noun',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmany\b\s+\bkinds\b\s+\bof\b/gi;
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
