import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * roll vs role
 * 
 * Source: LanguageTool (ROLE_ROLL)
 * Category: grammar
 */
export const roleRollRule: GrammarRule = {
  id: 'role-roll',
  name: 'roll vs role',
  description: 'Did you mean the verb ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\broles?\s+\ba?round|back|over|up|down\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the verb ?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
