import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * constellation (consolation) prize
 * 
 * Source: LanguageTool (CONSTELLATION_PRIZE)
 * Category: grammar
 */
export const constellationPrizeRule: GrammarRule = {
  id: 'constellation-prize',
  name: 'constellation (consolation) prize',
  description: 'Did you mean consolation prize?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bconstellation\b\s+\bprize\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean consolation prize?',
        suggestions: ["consolation prize"],
      });
    }
    
    return issues;
  },
};
