import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * verb accrue
 * 
 * Source: LanguageTool (ACCRUE)
 * Category: style
 */
export const accrueRule: GrammarRule = {
  id: 'accrue',
  name: 'verb accrue',
  description: 'Use add or gain.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Use add or gain.',
        suggestions: ["add","gain"],
      });
    }
    
    return issues;
  },
};
