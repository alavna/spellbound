import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * She is good-educated (well-educated).
 * 
 * Source: LanguageTool (GOOD_EDUCATED)
 * Category: grammar
 */
export const goodEducatedRule: GrammarRule = {
  id: 'good-educated',
  name: 'She is good-educated (well-educated).',
  description: 'In English, we use \"well\" to modify participles and adjectives like \"educated.\" Did you mean well-educated?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bgood-educated\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'In English, we use \"well\" to modify participles and adjectives like \"educated.\" Did you mean well-educated?',
        suggestions: ["well-educated"],
      });
    }
    
    return issues;
  },
};
