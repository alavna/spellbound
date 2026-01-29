import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Amendable to error
 * 
 * Source: LanguageTool (AMENABLE_AMENDABLE)
 * Category: grammar
 */
export const amenableAmendableRule: GrammarRule = {
  id: 'amenable-amendable',
  name: 'Amendable to error',
  description: 'Did you mean amenable?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bamendable\b\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean amenable?',
        suggestions: ["amenable"],
      });
    }
    
    return issues;
  },
};
