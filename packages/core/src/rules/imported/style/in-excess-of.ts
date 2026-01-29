import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * in excess of (more than, over, exceeding)
 * 
 * Source: LanguageTool (in_excess_of)
 * Category: style
 */
export const inExcessOfRule: GrammarRule = {
  id: 'in-excess-of',
  name: 'in excess of (more than, over, exceeding)',
  description: 'Better with more than, over, or exceeding',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin\b\s+\bexcess\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Better with more than, over, or exceeding',
        suggestions: ["more than","over","exceeding"],
      });
    }
    
    return issues;
  },
};
