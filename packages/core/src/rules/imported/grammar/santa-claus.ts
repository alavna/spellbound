import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Santa Clause (Claus)
 * 
 * Source: LanguageTool (SANTA_CLAUS)
 * Category: grammar
 */
export const santaClausRule: GrammarRule = {
  id: 'santa-claus',
  name: 'Santa Clause (Claus)',
  description: 'Did you mean Santa Claus?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bSanta?\s+[CK]lause?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean Santa Claus?',
        suggestions: ["Santa Claus"],
      });
    }
    
    return issues;
  },
};
