import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * outta (out of)
 * 
 * Source: LanguageTool (OUTTA)
 * Category: style
 */
export const outtaRule: GrammarRule = {
  id: 'outta',
  name: 'outta (out of)',
  description: 'The word \'\\1\' is informal.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\boutta\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word \'\\1\' is informal.',
        suggestions: ["out of"],
      });
    }
    
    return issues;
  },
};
