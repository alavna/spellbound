import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Queen's Gambit
 * 
 * Source: LanguageTool (QUEENS_GAMBIT)
 * Category: grammar
 */
export const queensGambitRule: GrammarRule = {
  id: 'queens-gambit',
  name: 'Queen\'s Gambit',
  description: 'It seems that a possessive apostrophe is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bqueens\b\s+\bgambits?|advocates?|university|guards?|awards?|bench(es)?|bount(y|ies)|bishops?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It seems that a possessive apostrophe is missing.',
        suggestions: ["\\2"],
      });
    }
    
    return issues;
  },
};
