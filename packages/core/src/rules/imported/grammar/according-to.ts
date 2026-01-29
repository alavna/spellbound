import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * according to
 * 
 * Source: LanguageTool (ACCORDING_TO)
 * Category: grammar
 */
export const accordingToRule: GrammarRule = {
  id: 'according-to',
  name: 'according to',
  description: 'Did you mean: according to? according to: (as stated/in the opinion of)',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\baccording\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean: according to? according to: (as stated/in the opinion of)',
        suggestions: ["according to"],
      });
    }
    
    return issues;
  },
};
