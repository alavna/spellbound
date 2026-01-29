import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * the flew (flu)
 * 
 * Source: LanguageTool (THE_FLEW)
 * Category: grammar
 */
export const theFlewRule: GrammarRule = {
  id: 'the-flew',
  name: 'the flew (flu)',
  description: 'Did you mean flu (flew is past tense of fly, flu is a viral disease)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthe\b\s+\bflew\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean flu (flew is past tense of fly, flu is a viral disease)?',
        suggestions: ["flu"],
      });
    }
    
    return issues;
  },
};
