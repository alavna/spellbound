import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * the ... and the ... is (are)
 * 
 * Source: LanguageTool (THE_NN_AND_THE_NN)
 * Category: grammar
 */
export const theNnAndTheNnRule: GrammarRule = {
  id: 'the-nn-and-the-nn',
  name: 'the ... and the ... is (are)',
  description: 'Did you mean are?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthe\b\s+\band\b\s+\bthe\b\s+\bis\b/gi;
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
