import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * overdue vs overdo
 * 
 * Source: LanguageTool (OVERDUE_OVERDO)
 * Category: grammar
 */
export const overdueOverdoRule: GrammarRule = {
  id: 'overdue-overdo',
  name: 'overdue vs overdo',
  description: 'Did you mean the verb overdo?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\boverdue\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the verb overdo?',
        suggestions: ["overdo"],
      });
    }
    
    return issues;
  },
};
