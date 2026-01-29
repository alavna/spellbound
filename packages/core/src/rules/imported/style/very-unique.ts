import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * very unique (unique)
 * 
 * Source: LanguageTool (VERY_UNIQUE)
 * Category: style
 */
export const veryUniqueRule: GrammarRule = {
  id: 'very-unique',
  name: 'very unique (unique)',
  description: 'Consider using \\2.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bvery|strikingly|most|really|totally|somewhat\b\s+\bunique\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using \\2.',
        suggestions: ["\\2"],
      });
    }
    
    return issues;
  },
};
