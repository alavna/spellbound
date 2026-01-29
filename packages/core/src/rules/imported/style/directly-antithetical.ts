import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * directly antithetical (antithetical)
 * 
 * Source: LanguageTool (DIRECTLY_ANTITHETICAL)
 * Category: style
 */
export const directlyAntitheticalRule: GrammarRule = {
  id: 'directly-antithetical',
  name: 'directly antithetical (antithetical)',
  description: 'This phrase verges on redundancy. Consider writing .',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdirectly\b\s+\bantithetical\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This phrase verges on redundancy. Consider writing .',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
