import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * ask + object (no preposition)
 * 
 * Source: LanguageTool (ASK_NO_PREPOSITION)
 * Category: grammar
 */
export const askNoPrepositionRule: GrammarRule = {
  id: 'ask-no-preposition',
  name: 'ask + object (no preposition)',
  description: 'The verb \'to someone\' does not require a preposition.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bto\b\s+&object_pronouns;/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The verb \'to someone\' does not require a preposition.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
