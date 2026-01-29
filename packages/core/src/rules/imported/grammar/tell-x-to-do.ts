import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I told her (to) break a leg
 * 
 * Source: LanguageTool (TELL_X_TO_DO)
 * Category: grammar
 */
export const tellXToDoRule: GrammarRule = {
  id: 'tell-x-to-do',
  name: 'I told her (to) break a leg',
  description: 'Did you mean to ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean to ?',
        suggestions: ["to"],
      });
    }
    
    return issues;
  },
};
