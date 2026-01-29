import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * luv (love)
 * 
 * Source: LanguageTool (LUV)
 * Category: style
 */
export const luvRule: GrammarRule = {
  id: 'luv',
  name: 'luv (love)',
  description: 'The word \'\\1\' is informal and non-standard.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bluvs?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word \'\\1\' is informal and non-standard.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
