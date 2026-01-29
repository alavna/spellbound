import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * full compliment (complement) of
 * 
 * Source: LanguageTool (FULL_COMPLIMENT_OF)
 * Category: grammar
 */
export const fullComplimentOfRule: GrammarRule = {
  id: 'full-compliment-of',
  name: 'full compliment (complement) of',
  description: 'Did you mean full complement of?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfull\b\s+\bcompliment\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean full complement of?',
        suggestions: ["full complement of"],
      });
    }
    
    return issues;
  },
};
