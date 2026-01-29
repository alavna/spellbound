import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing verb before 'not'
 * 
 * Source: LanguageTool (NN_NOT_JJ)
 * Category: grammar
 */
export const nnNotJjRule: GrammarRule = {
  id: 'nn-not-jj',
  name: 'missing verb before \'not\'',
  description: 'A verb may be missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bnot\b\s+\S+\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'A verb may be missing.',
        suggestions: ["is \\4"],
      });
    }
    
    return issues;
  },
};
