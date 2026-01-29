import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * ...the vocal tract is partially or completed (completely) closed
 * 
 * Source: LanguageTool (COMPLETED_COMPLETELY)
 * Category: grammar
 */
export const completedCompletelyRule: GrammarRule = {
  id: 'completed-completely',
  name: '...the vocal tract is partially or completed (completely) closed',
  description: 'Did you mean to use the adverb \'completely\' here?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\S+\s+\S+\s+\bcompleted\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean to use the adverb \'completely\' here?',
        suggestions: ["completely"],
      });
    }
    
    return issues;
  },
};
