import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Wrong preposition: 'be fond to' (be fond of)
 * 
 * Source: LanguageTool (BE_FOND_TO)
 * Category: grammar
 */
export const beFondToRule: GrammarRule = {
  id: 'be-fond-to',
  name: 'Wrong preposition: \'be fond to\' (be fond of)',
  description: 'Did you mean of?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfond\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean of?',
        suggestions: ["of"],
      });
    }
    
    return issues;
  },
};
