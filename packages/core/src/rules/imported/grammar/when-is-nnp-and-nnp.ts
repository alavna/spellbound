import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Incorrect use of 'is' vs. 'are'
 * 
 * Source: LanguageTool (WHEN_IS_NNP_AND_NNP)
 * Category: grammar
 */
export const whenIsNnpAndNnpRule: GrammarRule = {
  id: 'when-is-nnp-and-nnp',
  name: 'Incorrect use of \'is\' vs. \'are\'',
  description: 'Did you mean are?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\S+\s+\bis\b\s+\S+\s+\S+\s+\band|&amp;|,\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean are?',
        suggestions: ["are"],
      });
    }
    
    return issues;
  },
};
