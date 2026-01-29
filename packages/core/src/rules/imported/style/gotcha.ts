import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * gotcha (got you)
 * 
 * Source: LanguageTool (GOTCHA)
 * Category: style
 */
export const gotchaRule: GrammarRule = {
  id: 'gotcha',
  name: 'gotcha (got you)',
  description: 'The word \"\\1\" is informal.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bI|we|s?he|it|they\b\s+\S+\s+\bgotcha\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word \"\\1\" is informal.',
        suggestions: ["got you"],
      });
    }
    
    return issues;
  },
};
