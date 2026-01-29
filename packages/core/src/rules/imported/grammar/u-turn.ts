import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * u-turn (U-turn)
 * 
 * Source: LanguageTool (U_TURN)
 * Category: grammar
 */
export const uTurnRule: GrammarRule = {
  id: 'u-turn',
  name: 'u-turn (U-turn)',
  description: 'The letter \"U\" needs to be capitalized in the noun .',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bu-(turn|boat|bend|value)s?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The letter \"U\" needs to be capitalized in the noun .',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
