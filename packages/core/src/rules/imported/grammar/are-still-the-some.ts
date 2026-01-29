import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * are still the some (same)
 * 
 * Source: LanguageTool (ARE_STILL_THE_SOME)
 * Category: grammar
 */
export const areStillTheSomeRule: GrammarRule = {
  id: 'are-still-the-some',
  name: 'are still the some (same)',
  description: 'Did you mean \\1 still the same or \\1 still some?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bare|is|w(?:as|ere)\s+\bstill\b\s+\bthe\b\s+\bsome\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1 still the same or \\1 still some?',
        suggestions: ["\\1 still the same","\\1 still some"],
      });
    }
    
    return issues;
  },
};
