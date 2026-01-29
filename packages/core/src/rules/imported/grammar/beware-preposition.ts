import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * beware PREPOSITION
 * 
 * Source: LanguageTool (BEWARE_PREPOSITION)
 * Category: grammar
 */
export const bewarePrepositionRule: GrammarRule = {
  id: 'beware-preposition',
  name: 'beware PREPOSITION',
  description: 'Did you mean: beware of?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean: beware of?',
        suggestions: ["beware of"],
      });
    }
    
    return issues;
  },
};
