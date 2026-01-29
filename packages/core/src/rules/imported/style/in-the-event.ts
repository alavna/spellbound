import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * in the event of, in the event that (if, in case)
 * 
 * Source: LanguageTool (IN_THE_EVENT)
 * Category: style
 */
export const inTheEventRule: GrammarRule = {
  id: 'in-the-event',
  name: 'in the event of, in the event that (if, in case)',
  description: 'Did you mean if or in case of?',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin\b\s+\bthe\b\s+\bevent\b\s+\bof|that\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean if or in case of?',
        suggestions: ["if","in case of"],
      });
    }
    
    return issues;
  },
};
