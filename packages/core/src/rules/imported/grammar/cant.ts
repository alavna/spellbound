import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * cant (can't)
 * 
 * Source: LanguageTool (CANT)
 * Category: grammar
 */
export const cantRule: GrammarRule = {
  id: 'cant',
  name: 'cant (can\'t)',
  description: 'Did you mean can\'t or cannot?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcant\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean can\'t or cannot?',
        suggestions: ["can't","cannot"],
      });
    }
    
    return issues;
  },
};
