import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * overnight instead of 'over night'
 * 
 * Source: LanguageTool (OVERNIGHT)
 * Category: grammar
 */
export const overnightRule: GrammarRule = {
  id: 'overnight',
  name: 'overnight instead of \'over night\'',
  description: 'Did you mean the verb, adjective or adverb \\1 (i.e., for or during the entire night)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bover\b\s+\bnight(ing|ed)?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the verb, adjective or adverb \\1 (i.e., for or during the entire night)?',
        suggestions: ["\\1"],
      });
    }
    
    return issues;
  },
};
