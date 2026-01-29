import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * has it advantages → has its advantages
 * 
 * Source: LanguageTool (HAS_IT_NNS__IT_ITS)
 * Category: grammar
 */
export const hasItNnsItItsRule: GrammarRule = {
  id: 'has-it-nns-it-its',
  name: 'has it advantages → has its advantages',
  description: 'The word \'\\2\' may not fit between \'\\1\' and the plural noun \'\\3\'. Did you mean its?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bit\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word \'\\2\' may not fit between \'\\1\' and the plural noun \'\\3\'. Did you mean its?',
        suggestions: ["its"],
      });
    }
    
    return issues;
  },
};
