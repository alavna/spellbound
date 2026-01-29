import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * continue to remain (remain)
 * 
 * Source: LanguageTool (CONTINUE_TO_REMAIN)
 * Category: style
 */
export const continueToRemainRule: GrammarRule = {
  id: 'continue-to-remain',
  name: 'continue to remain (remain)',
  description: 'Consider using remain.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bto\b\s+\bremain\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using remain.',
        suggestions: ["remain"],
      });
    }
    
    return issues;
  },
};
