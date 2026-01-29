import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * roll player (role player)
 * 
 * Source: LanguageTool (ROLL_PLAYER)
 * Category: grammar
 */
export const rollPlayerRule: GrammarRule = {
  id: 'roll-player',
  name: 'roll player (role player)',
  description: 'Did you mean role \\2?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\broll\b\s+\bplayers?|models?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean role \\2?',
        suggestions: ["role \\2"],
      });
    }
    
    return issues;
  },
};
