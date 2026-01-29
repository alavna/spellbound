import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * right over (over)
 * 
 * Source: LanguageTool (RIGHT_OVER)
 * Category: style
 */
export const rightOverRule: GrammarRule = {
  id: 'right-over',
  name: 'right over (over)',
  description: 'This phrase is redundant. Consider using \\2.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bright\b\s+\bover\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This phrase is redundant. Consider using \\2.',
        suggestions: ["\\2"],
      });
    }
    
    return issues;
  },
};
