import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * lemme (let me)
 * 
 * Source: LanguageTool (LEMME)
 * Category: style
 */
export const lemmeRule: GrammarRule = {
  id: 'lemme',
  name: 'lemme (let me)',
  description: 'The word \'\\1\' is informal.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\blemme\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word \'\\1\' is informal.',
        suggestions: ["let me"],
      });
    }
    
    return issues;
  },
};
