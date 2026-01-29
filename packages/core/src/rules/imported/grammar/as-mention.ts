import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * as mention (mentioned)
 * 
 * Source: LanguageTool (AS_MENTION)
 * Category: grammar
 */
export const asMentionRule: GrammarRule = {
  id: 'as-mention',
  name: 'as mention (mentioned)',
  description: 'Did you mean mentioned (past tense of \"mention\")?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bas\b\s+\bmention\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean mentioned (past tense of \"mention\")?',
        suggestions: ["mentioned"],
      });
    }
    
    return issues;
  },
};
