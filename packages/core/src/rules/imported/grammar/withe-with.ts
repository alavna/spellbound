import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * with(e)
 * 
 * Source: LanguageTool (WITHE_WITH)
 * Category: grammar
 */
export const witheWithRule: GrammarRule = {
  id: 'withe-with',
  name: 'with(e)',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwithe\b\s+\S+/gi;
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
