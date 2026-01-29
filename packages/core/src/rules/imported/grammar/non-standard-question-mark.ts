import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Non-standard question mark
 * 
 * Source: LanguageTool (NON_STANDARD_QUESTION_MARK)
 * Category: grammar
 */
export const nonStandardQuestionMarkRule: GrammarRule = {
  id: 'non-standard-question-mark',
  name: 'Non-standard question mark',
  description: 'The character \'？\' is not a standard question mark, although it can look like a question mark.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /.*[a-z].*\.FF1F\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The character \'？\' is not a standard question mark, although it can look like a question mark.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
