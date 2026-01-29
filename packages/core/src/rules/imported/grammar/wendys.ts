import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Wendy's
 * 
 * Source: LanguageTool (WENDYS)
 * Category: grammar
 */
export const wendysRule: GrammarRule = {
  id: 'wendys',
  name: 'Wendy\'s',
  description: 'Did you mean the name Wendy\'s (spelled with a possessive apostrophe)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwendys\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the name Wendy\'s (spelled with a possessive apostrophe)?',
        suggestions: ["Wendy's"],
      });
    }
    
    return issues;
  },
};
