import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * In loved (love) with
 * 
 * Source: LanguageTool (IN_LOVED_WITH)
 * Category: grammar
 */
export const inLovedWithRule: GrammarRule = {
  id: 'in-loved-with',
  name: 'In loved (love) with',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin\b\s+\bloved|troubled\b\s+\bwith|for|because\b/gi;
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
