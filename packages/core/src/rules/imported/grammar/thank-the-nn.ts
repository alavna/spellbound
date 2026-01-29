import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 'Thank the' + noun
 * 
 * Source: LanguageTool (THANK_THE_NN)
 * Category: grammar
 */
export const thankTheNnRule: GrammarRule = {
  id: 'thank-the-nn',
  name: '\'Thank the\' + noun',
  description: 'Did you mean \\2s to or \\2s for?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bthank\b\s+\bthe\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\2s to or \\2s for?',
        suggestions: ["\\2s to","\\2s for"],
      });
    }
    
    return issues;
  },
};
