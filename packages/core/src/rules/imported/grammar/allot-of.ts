import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * allot of (a lot of)
 * 
 * Source: LanguageTool (ALLOT_OF)
 * Category: grammar
 */
export const allotOfRule: GrammarRule = {
  id: 'allot-of',
  name: 'allot of (a lot of)',
  description: 'Did you mean a lot of (=plenty)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ballot\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean a lot of (=plenty)?',
        suggestions: ["a lot of"],
      });
    }
    
    return issues;
  },
};
