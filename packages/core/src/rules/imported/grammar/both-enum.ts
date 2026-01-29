import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 'to both ...' with more than two items
 * 
 * Source: LanguageTool (BOTH_ENUM)
 * Category: grammar
 */
export const bothEnumRule: GrammarRule = {
  id: 'both-enum',
  name: '\'to both ...\' with more than two items',
  description: '\'both\' is usually followed by exactly two items.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bto\b\s+\bboth\b\s+,\s+,\s+\band\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\'both\' is usually followed by exactly two items.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
