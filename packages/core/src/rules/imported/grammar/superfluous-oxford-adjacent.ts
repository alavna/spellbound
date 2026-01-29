import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Remove comma after Oxford list, before predicate
 * 
 * Source: LanguageTool (SUPERFLUOUS_OXFORD_ADJACENT)
 * Category: grammar
 */
export const superfluousOxfordAdjacentRule: GrammarRule = {
  id: 'superfluous-oxford-adjacent',
  name: 'Remove comma after Oxford list, before predicate',
  description: 'For writing that flows more naturally, remove the comma.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\blike|such\b\s+,\s+,\s+\band\b\s+,\s+\S+\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'For writing that flows more naturally, remove the comma.',
        suggestions: ["\\12"],
      });
    }
    
    return issues;
  },
};
