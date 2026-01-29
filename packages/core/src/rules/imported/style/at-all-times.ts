import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * at all times (always) 
 * 
 * Source: LanguageTool (AT_ALL_TIMES)
 * Category: style
 */
export const atAllTimesRule: GrammarRule = {
  id: 'at-all-times',
  name: 'at all times (always) ',
  description: 'Simply, always. Pay attention to place in the sentence.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bat\b\s+\ball\b\s+\btimes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Simply, always. Pay attention to place in the sentence.',
        suggestions: ["always"],
      });
    }
    
    return issues;
  },
};
