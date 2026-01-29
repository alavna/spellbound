import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * different than (from)
 * 
 * Source: LanguageTool (DIFFERENT_THAN)
 * Category: style
 */
export const differentThanRule: GrammarRule = {
  id: 'different-than',
  name: 'different than (from)',
  description: 'Did you mean \'different from\'? \'Different than\' is often considered colloquial style.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdifferent\b\s+\bth[ae]n\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \'different from\'? \'Different than\' is often considered colloquial style.',
        suggestions: ["from"],
      });
    }
    
    return issues;
  },
};
