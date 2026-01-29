import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * belief (believe)
 * 
 * Source: LanguageTool (BELIEF_BELIEVE)
 * Category: grammar
 */
export const beliefBelieveRule: GrammarRule = {
  id: 'belief-believe',
  name: 'belief (believe)',
  description: 'Did you mean (verb) instead of (noun)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bs?he|it|we|they|I|you|[cw]ould|should|can|ca|cannot|will|could|did|does|[dw]o|might|must|may\b\s+\S+\s+[rb]eliefs?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean (verb) instead of (noun)?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
