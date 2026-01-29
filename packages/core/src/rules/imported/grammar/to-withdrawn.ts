import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * to/will before withdrawn
 * 
 * Source: LanguageTool (TO_WITHDRAWN)
 * Category: grammar
 */
export const toWithdrawnRule: GrammarRule = {
  id: 'to-withdrawn',
  name: 'to/will before withdrawn',
  description: 'Did you mean withdraw?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bto|will\b\s+\bwithdrawn\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean withdraw?',
        suggestions: ["withdraw"],
      });
    }
    
    return issues;
  },
};
