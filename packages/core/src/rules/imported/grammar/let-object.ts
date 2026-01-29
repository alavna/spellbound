import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Let + object
 * 
 * Source: LanguageTool (LET_OBJECT)
 * Category: grammar
 */
export const letObjectRule: GrammarRule = {
  id: 'let-object',
  name: 'Let + object',
  description: 'The object form of the pronoun may be required here.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bLet\b\s+\bI|he|she|we|they\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The object form of the pronoun may be required here.',
        suggestions: ["me","him","her","us","them"],
      });
    }
    
    return issues;
  },
};
