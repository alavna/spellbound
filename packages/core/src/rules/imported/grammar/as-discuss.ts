import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * as discuss (discussed)
 * 
 * Source: LanguageTool (AS_DISCUSS)
 * Category: grammar
 */
export const asDiscussRule: GrammarRule = {
  id: 'as-discuss',
  name: 'as discuss (discussed)',
  description: 'Did you mean discussed?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bas\b\s+\bdiscuss?\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean discussed?',
        suggestions: ["discussed"],
      });
    }
    
    return issues;
  },
};
