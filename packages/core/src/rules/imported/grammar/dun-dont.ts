import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * dun vs don't
 * 
 * Source: LanguageTool (DUN_DONT)
 * Category: grammar
 */
export const dunDontRule: GrammarRule = {
  id: 'dun-dont',
  name: 'dun vs don\'t',
  description: 'Did you mean don\'t?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdunt?\s+\S+\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean don\'t?',
        suggestions: ["don't"],
      });
    }
    
    return issues;
  },
};
