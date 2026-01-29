import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * side kick (sidekick)
 * 
 * Source: LanguageTool (SIDE_KICK)
 * Category: grammar
 */
export const sideKickRule: GrammarRule = {
  id: 'side-kick',
  name: 'side kick (sidekick)',
  description: 'Did you mean side?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bside\b\s+\bkicks?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean side?',
        suggestions: ["side"],
      });
    }
    
    return issues;
  },
};
