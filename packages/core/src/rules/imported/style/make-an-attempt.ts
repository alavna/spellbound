import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * make an attempt/effort/try (try)
 * 
 * Source: LanguageTool (MAKE_AN_ATTEMPT)
 * Category: style
 */
export const makeAnAttemptRule: GrammarRule = {
  id: 'make-an-attempt',
  name: 'make an attempt/effort/try (try)',
  description: 'Can you write try and still be correct?',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\ban?\s+\battempt|effort|try\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Can you write try and still be correct?',
        suggestions: ["try"],
      });
    }
    
    return issues;
  },
};
