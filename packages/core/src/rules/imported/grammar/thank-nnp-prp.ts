import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 'Thank' + Proper noun
 * 
 * Source: LanguageTool (THANK_NNP_PRP)
 * Category: grammar
 */
export const thankNnpPrpRule: GrammarRule = {
  id: 'thank-nnp-prp',
  name: '\'Thank\' + Proper noun',
  description: 'Did you mean \\2s to \\3 or \\2s \\3,?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bthank\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\2s to \\3 or \\2s \\3,?',
        suggestions: ["\\2s to \\3","\\2s \\3,"],
      });
    }
    
    return issues;
  },
};
