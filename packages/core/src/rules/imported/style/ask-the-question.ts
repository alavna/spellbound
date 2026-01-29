import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * ask the question (ask)
 * 
 * Source: LanguageTool (ASK_THE_QUESTION)
 * Category: style
 */
export const askTheQuestionRule: GrammarRule = {
  id: 'ask-the-question',
  name: 'ask the question (ask)',
  description: 'Consider using \\1 instead.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bthe\b\s+\bquestion\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using \\1 instead.',
        suggestions: ["\\1"],
      });
    }
    
    return issues;
  },
};
