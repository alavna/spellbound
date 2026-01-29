import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * the question what (the question of what)
 * 
 * Source: LanguageTool (THE_QUESTION_WH)
 * Category: grammar
 */
export const theQuestionWhRule: GrammarRule = {
  id: 'the-question-wh',
  name: 'the question what (the question of what)',
  description: 'This sounds awkward in English. The standard is of .',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthe\b\s+\bquestion\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This sounds awkward in English. The standard is of .',
        suggestions: ["of"],
      });
    }
    
    return issues;
  },
};
