import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * of any of → of
 * 
 * Source: LanguageTool (OF_ANY_OF)
 * Category: style
 */
export const ofAnyOfRule: GrammarRule = {
  id: 'of-any-of',
  name: 'of any of → of',
  description: 'Consider simply using of instead.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bof\b\s+\bany\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider simply using of instead.',
        suggestions: ["of"],
      });
    }
    
    return issues;
  },
};
