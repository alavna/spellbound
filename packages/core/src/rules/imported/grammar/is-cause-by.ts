import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * is cause (caused) by
 * 
 * Source: LanguageTool (IS_CAUSE_BY)
 * Category: grammar
 */
export const isCauseByRule: GrammarRule = {
  id: 'is-cause-by',
  name: 'is cause (caused) by',
  description: 'Did you mean caused?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bis|was|are|were|been\b\s+\bcause\b\s+\bby\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean caused?',
        suggestions: ["caused"],
      });
    }
    
    return issues;
  },
};
