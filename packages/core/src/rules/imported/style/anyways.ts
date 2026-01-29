import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * anyways (anyway)
 * 
 * Source: LanguageTool (ANYWAYS)
 * Category: style
 */
export const anywaysRule: GrammarRule = {
  id: 'anyways',
  name: 'anyways (anyway)',
  description: 'The word \'\\1\' is informal American English. Did you mean anyway?',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\banyways\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word \'\\1\' is informal American English. Did you mean anyway?',
        suggestions: ["anyway"],
      });
    }
    
    return issues;
  },
};
