import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * bestest (best)
 * 
 * Source: LanguageTool (BESTEST)
 * Category: style
 */
export const bestestRule: GrammarRule = {
  id: 'bestest',
  name: 'bestest (best)',
  description: 'The word \"\\1\" is informal.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbestest\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word \"\\1\" is informal.',
        suggestions: ["best"],
      });
    }
    
    return issues;
  },
};
