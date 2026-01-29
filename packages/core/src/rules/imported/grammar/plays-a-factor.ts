import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * plays a factor (plays a role)
 * 
 * Source: LanguageTool (PLAYS_A_FACTOR)
 * Category: grammar
 */
export const playsAFactorRule: GrammarRule = {
  id: 'plays-a-factor',
  name: 'plays a factor (plays a role)',
  description: 'Did you mean plays a role?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bplays\b\s+\ba\b\s+\bfactor\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean plays a role?',
        suggestions: ["plays a role"],
      });
    }
    
    return issues;
  },
};
