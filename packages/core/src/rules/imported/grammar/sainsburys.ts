import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Sainsbury's
 * 
 * Source: LanguageTool (SAINSBURYS)
 * Category: grammar
 */
export const sainsburysRule: GrammarRule = {
  id: 'sainsburys',
  name: 'Sainsbury\'s',
  description: 'Did you mean the grocery shopping company Sainsbury\'s (spelled with a possessive apostrophe)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsainsburys\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the grocery shopping company Sainsbury\'s (spelled with a possessive apostrophe)?',
        suggestions: ["Sainsbury's"],
      });
    }
    
    return issues;
  },
};
