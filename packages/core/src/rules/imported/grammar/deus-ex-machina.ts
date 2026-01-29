import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * deus ex machina
 * 
 * Source: LanguageTool (DEUS_EX_MACHINA)
 * Category: grammar
 */
export const deusExMachinaRule: GrammarRule = {
  id: 'deus-ex-machina',
  name: 'deus ex machina',
  description: 'The correct spelling for this expression is deus ex machina.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdeu[sx]?\s+\bex\b\s+\bmachin[ea]?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The correct spelling for this expression is deus ex machina.',
        suggestions: ["deus ex machina"],
      });
    }
    
    return issues;
  },
};
