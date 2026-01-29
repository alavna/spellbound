import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * week-end (weekend)
 * 
 * Source: LanguageTool (WEEK_END_HYPHEN)
 * Category: style
 */
export const weekEndHyphenRule: GrammarRule = {
  id: 'week-end-hyphen',
  name: 'week-end (weekend)',
  description: 'This word might seem dated. Consider spelling it without a hyphen.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bweek-ends?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This word might seem dated. Consider spelling it without a hyphen.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
