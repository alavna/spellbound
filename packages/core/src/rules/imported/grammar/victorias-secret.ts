import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Victoria's Secret
 * 
 * Source: LanguageTool (VICTORIAS_SECRET)
 * Category: grammar
 */
export const victoriasSecretRule: GrammarRule = {
  id: 'victorias-secret',
  name: 'Victoria\'s Secret',
  description: 'Did you mean the lingerie company Victoria\'s Secret (capitalized and spelled with a possessive apostrophe)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bVictorias?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the lingerie company Victoria\'s Secret (capitalized and spelled with a possessive apostrophe)?',
        suggestions: ["Victoria's Secret"],
      });
    }
    
    return issues;
  },
};
