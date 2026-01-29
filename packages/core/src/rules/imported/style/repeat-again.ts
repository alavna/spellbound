import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * repeat again (repeat)
 * 
 * Source: LanguageTool (REPEAT_AGAIN)
 * Category: style
 */
export const repeatAgainRule: GrammarRule = {
  id: 'repeat-again',
  name: 'repeat again (repeat)',
  description: 'Consider using \\1.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bagain\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using \\1.',
        suggestions: ["\\1"],
      });
    }
    
    return issues;
  },
};
