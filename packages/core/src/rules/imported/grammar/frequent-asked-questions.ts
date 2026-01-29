import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Frequently Asked Questions
 * 
 * Source: LanguageTool (FREQUENT_ASKED_QUESTIONS)
 * Category: grammar
 */
export const frequentAskedQuestionsRule: GrammarRule = {
  id: 'frequent-asked-questions',
  name: 'Frequently Asked Questions',
  description: 'Did you mean \\3 (= FAQ)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfrequent(ly)?\s+\bask(ed)?\s+\bquestions?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\3 (= FAQ)?',
        suggestions: ["\\3"],
      });
    }
    
    return issues;
  },
};
