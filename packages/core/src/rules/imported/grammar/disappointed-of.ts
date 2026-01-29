import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Disappointed with, at, or by
 * 
 * Source: LanguageTool (DISAPPOINTED_OF)
 * Category: grammar
 */
export const disappointedOfRule: GrammarRule = {
  id: 'disappointed-of',
  name: 'Disappointed with, at, or by',
  description: 'The usual collocation for \"disappointed\" is \"with\", \"at\", \"by\", but never \"of\". Did you mean \\1 with?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdisappointed\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The usual collocation for \"disappointed\" is \"with\", \"at\", \"by\", but never \"of\". Did you mean \\1 with?',
        suggestions: ["\\1 with","\\1 at","\\1 by"],
      });
    }
    
    return issues;
  },
};
