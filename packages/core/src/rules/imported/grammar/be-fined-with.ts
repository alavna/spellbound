import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * be fined with (be fine with)
 * 
 * Source: LanguageTool (BE_FINED_WITH)
 * Category: grammar
 */
export const beFinedWithRule: GrammarRule = {
  id: 'be-fined-with',
  name: 'be fined with (be fine with)',
  description: 'Did you mean fine?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bfined\b\s+\bwith\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean fine?',
        suggestions: ["fine"],
      });
    }
    
    return issues;
  },
};
