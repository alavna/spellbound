import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * clearly, obviously
 * 
 * Source: LanguageTool (CLEARLY_OR_OBVIOUSLY)
 * Category: style
 */
export const clearlyOrObviouslyRule: GrammarRule = {
  id: 'clearly-or-obviously',
  name: 'clearly, obviously',
  description: 'Something that is clear to you is not always clear to the reader. Remove \"\\1\" unless it is necessary.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bclearly|obviously|doubtlessly\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Something that is clear to you is not always clear to the reader. Remove \"\\1\" unless it is necessary.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
