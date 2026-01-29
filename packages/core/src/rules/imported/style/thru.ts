import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * thru / through
 * 
 * Source: LanguageTool (THRU)
 * Category: style
 */
export const thruRule: GrammarRule = {
  id: 'thru',
  name: 'thru / through',
  description: 'The word \'thru\' is informal. Consider replacing it with through.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthru\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word \'thru\' is informal. Consider replacing it with through.',
        suggestions: ["through"],
      });
    }
    
    return issues;
  },
};
