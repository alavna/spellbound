import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * as sad (said)
 * 
 * Source: LanguageTool (AS_SAD)
 * Category: grammar
 */
export const asSadRule: GrammarRule = {
  id: 'as-sad',
  name: 'as sad (said)',
  description: 'Did you mean said (past tense of \"say\")?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bas\b\s+\bsad|sayed\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean said (past tense of \"say\")?',
        suggestions: ["said"],
      });
    }
    
    return issues;
  },
};
