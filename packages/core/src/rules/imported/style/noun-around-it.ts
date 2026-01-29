import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * the noun around it (surrounding noun)
 * 
 * Source: LanguageTool (NOUN_AROUND_IT)
 * Category: style
 */
export const nounAroundItRule: GrammarRule = {
  id: 'noun-around-it',
  name: 'the noun around it (surrounding noun)',
  description: 'Consider using the surrounding \\2.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthe\b\s+\baround\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using the surrounding \\2.',
        suggestions: ["the surrounding \\2"],
      });
    }
    
    return issues;
  },
};
