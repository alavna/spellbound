import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * gues vs guess
 * 
 * Source: LanguageTool (GUES_GUESS)
 * Category: grammar
 */
export const guesGuessRule: GrammarRule = {
  id: 'gues-guess',
  name: 'gues vs guess',
  description: 'Did you mean the verb guess?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\S+\s+[Gg]ues\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the verb guess?',
        suggestions: ["guess"],
      });
    }
    
    return issues;
  },
};
