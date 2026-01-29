import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * with the exception of (except)
 * 
 * Source: LanguageTool (WITH_THE_EXCEPTION_OF)
 * Category: style
 */
export const withTheExceptionOfRule: GrammarRule = {
  id: 'with-the-exception-of',
  name: 'with the exception of (except)',
  description: 'Consider using except or except for',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwith\b\s+\bthe\b\s+\bexception\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using except or except for',
        suggestions: ["except","except for"],
      });
    }
    
    return issues;
  },
};
