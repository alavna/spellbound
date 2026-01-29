import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * McDonald's
 * 
 * Source: LanguageTool (MCDONALDS)
 * Category: grammar
 */
export const mcdonaldsRule: GrammarRule = {
  id: 'mcdonalds',
  name: 'McDonald\'s',
  description: 'Did you mean the fast food chain McDonald\'s (always spelled with a possessive apostrophe)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmcdonalds\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the fast food chain McDonald\'s (always spelled with a possessive apostrophe)?',
        suggestions: ["McDonald's"],
      });
    }
    
    return issues;
  },
};
