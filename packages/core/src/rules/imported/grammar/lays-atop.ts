import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * lays (lies) atop
 * 
 * Source: LanguageTool (LAYS_ATOP)
 * Category: grammar
 */
export const laysAtopRule: GrammarRule = {
  id: 'lays-atop',
  name: 'lays (lies) atop',
  description: 'Did you mean lies ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\blays\b\s+\batop|beside|low|near|on\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean lies ?',
        suggestions: ["lies"],
      });
    }
    
    return issues;
  },
};
