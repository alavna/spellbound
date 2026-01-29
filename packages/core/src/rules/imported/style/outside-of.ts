import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * outside of (outside)
 * 
 * Source: LanguageTool (OUTSIDE_OF)
 * Category: style
 */
export const outsideOfRule: GrammarRule = {
  id: 'outside-of',
  name: 'outside of (outside)',
  description: 'This phrase is redundant. Consider using \\2.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\binside\.outside\b\s+\bof\b/gi;
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
