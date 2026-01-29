import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * a girls best friend
 * 
 * Source: LanguageTool (A_NNS_BEST_NN)
 * Category: grammar
 */
export const aNnsBestNnRule: GrammarRule = {
  id: 'a-nns-best-nn',
  name: 'a girls best friend',
  description: 'It seems that a possessive apostrophe is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban?\s+.+s\b\s+\bbest|worst\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It seems that a possessive apostrophe is missing.',
        suggestions: ["'s"],
      });
    }
    
    return issues;
  },
};
