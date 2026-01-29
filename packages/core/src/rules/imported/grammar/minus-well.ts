import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * minus well (might as well)
 * 
 * Source: LanguageTool (MINUS_WELL)
 * Category: grammar
 */
export const minusWellRule: GrammarRule = {
  id: 'minus-well',
  name: 'minus well (might as well)',
  description: 'Did you mean might as well?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bminus\b\s+\bwell\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean might as well?',
        suggestions: ["might as well"],
      });
    }
    
    return issues;
  },
};
