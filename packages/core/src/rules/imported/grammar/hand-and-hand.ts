import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * hand and hand (hand in hand)
 * 
 * Source: LanguageTool (HAND_AND_HAND)
 * Category: grammar
 */
export const handAndHandRule: GrammarRule = {
  id: 'hand-and-hand',
  name: 'hand and hand (hand in hand)',
  description: 'Did you mean hand in hand?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhand\b\s+\band\b\s+\bhand\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean hand in hand?',
        suggestions: ["hand in hand"],
      });
    }
    
    return issues;
  },
};
