import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * gather up (gather)
 * 
 * Source: LanguageTool (GATHER_UP)
 * Category: style
 */
export const gatherUpRule: GrammarRule = {
  id: 'gather-up',
  name: 'gather up (gather)',
  description: 'This phrase is redundant. Consider using \\1.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bgather\.lift\b\s+\bup\b/gi;
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
