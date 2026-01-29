import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * ever day (every day)
 * 
 * Source: LanguageTool (EVER_NN)
 * Category: grammar
 */
export const everNnRule: GrammarRule = {
  id: 'ever-nn',
  name: 'ever day (every day)',
  description: 'Did you mean every \\2?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bever\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean every \\2?',
        suggestions: ["every \\2"],
      });
    }
    
    return issues;
  },
};
