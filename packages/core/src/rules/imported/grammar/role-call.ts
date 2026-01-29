import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * role (roll) call
 * 
 * Source: LanguageTool (ROLE_CALL)
 * Category: grammar
 */
export const roleCallRule: GrammarRule = {
  id: 'role-call',
  name: 'role (roll) call',
  description: 'Did you mean roll call?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\brole\b\s+\bcall\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean roll call?',
        suggestions: ["roll call"],
      });
    }
    
    return issues;
  },
};
