import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Uncle Bens -> Ben's
 * 
 * Source: LanguageTool (UNCLE_BENS)
 * Category: grammar
 */
export const uncleBensRule: GrammarRule = {
  id: 'uncle-bens',
  name: 'Uncle Bens -> Ben\'s',
  description: 'Did you mean the rice brand Uncle Ben\'s (capitalized and spelled with a possessive apostrophe)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bUncle\b\s+\bBens\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the rice brand Uncle Ben\'s (capitalized and spelled with a possessive apostrophe)?',
        suggestions: ["Uncle Ben's"],
      });
    }
    
    return issues;
  },
};
