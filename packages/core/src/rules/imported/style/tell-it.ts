import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I [told it to] -> I [told] Leo
 * 
 * Source: LanguageTool (TELL_IT)
 * Category: style
 */
export const tellItRule: GrammarRule = {
  id: 'tell-it',
  name: 'I [told it to] -> I [told] Leo',
  description: 'This phrasing could be wordy.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bit\b\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This phrasing could be wordy.',
        suggestions: ["\\1"],
      });
    }
    
    return issues;
  },
};
