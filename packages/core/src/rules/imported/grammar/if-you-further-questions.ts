import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * if you (have) further questions
 * 
 * Source: LanguageTool (IF_YOU_FURTHER_QUESTIONS)
 * Category: grammar
 */
export const ifYouFurtherQuestionsRule: GrammarRule = {
  id: 'if-you-further-questions',
  name: 'if you (have) further questions',
  description: 'It appears that a verb is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bif|when\b\s+\byou|they|I\b\s+\bquestions|concerns|clarification|advice|queries|comments|information|explanation|assistance|help|details\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that a verb is missing.',
        suggestions: ["\\2 have","\\2 need"],
      });
    }
    
    return issues;
  },
};
