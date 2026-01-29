import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * drop down (drop)
 * 
 * Source: LanguageTool (DROP_DOWN)
 * Category: style
 */
export const dropDownRule: GrammarRule = {
  id: 'drop-down',
  name: 'drop down (drop)',
  description: 'This phrase is redundant. Consider using \\1.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bdown\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This phrase is redundant. Consider using \\1.',
        suggestions: ["\\1"],
      });
    }
    
    return issues;
  },
};
