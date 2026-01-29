import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * a feedback
 * 
 * Source: LanguageTool (A_FEEDBACK)
 * Category: grammar
 */
export const aFeedbackRule: GrammarRule = {
  id: 'a-feedback',
  name: 'a feedback',
  description: 'The noun \"\\3\" is uncountable and doesn\'t require an article.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ba\b\s+\bfeedback\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun \"\\3\" is uncountable and doesn\'t require an article.',
        suggestions: ["\\2 \\3"],
      });
    }
    
    return issues;
  },
};
