import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * slight (sleight) of hand
 * 
 * Source: LanguageTool (SLIGHT_OF_HAND)
 * Category: grammar
 */
export const slightOfHandRule: GrammarRule = {
  id: 'slight-of-hand',
  name: 'slight (sleight) of hand',
  description: 'Did you mean sleight?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bslights?\s+\bof\b\s+\bhand\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean sleight?',
        suggestions: ["sleight"],
      });
    }
    
    return issues;
  },
};
