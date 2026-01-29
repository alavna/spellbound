import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * descend down (descend)
 * 
 * Source: LanguageTool (DESCEND_DOWN)
 * Category: style
 */
export const descendDownRule: GrammarRule = {
  id: 'descend-down',
  name: 'descend down (descend)',
  description: 'This phrase might be redundant. Consider using \\1.',
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
        message: 'This phrase might be redundant. Consider using \\1.',
        suggestions: ["\\1"],
      });
    }
    
    return issues;
  },
};
