import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * fastly (quickly)
 * 
 * Source: LanguageTool (FASTLY)
 * Category: style
 */
export const fastlyRule: GrammarRule = {
  id: 'fastly',
  name: 'fastly (quickly)',
  description: 'The adverb \"fastly\" is considered archaic. Consider an alternative.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfastly\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The adverb \"fastly\" is considered archaic. Consider an alternative.',
        suggestions: ["quickly","fast","swiftly"],
      });
    }
    
    return issues;
  },
};
