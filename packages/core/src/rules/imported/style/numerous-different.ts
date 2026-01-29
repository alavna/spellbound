import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * numerous different (numerous)
 * 
 * Source: LanguageTool (NUMEROUS_DIFFERENT)
 * Category: style
 */
export const numerousDifferentRule: GrammarRule = {
  id: 'numerous-different',
  name: 'numerous different (numerous)',
  description: 'Consider using \\1.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bnumerous|several|many\b\s+\bdifferent|separate\b/gi;
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
