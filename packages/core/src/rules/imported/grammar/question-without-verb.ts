import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing verb in question
 * 
 * Source: LanguageTool (QUESTION_WITHOUT_VERB)
 * Category: grammar
 */
export const questionWithoutVerbRule: GrammarRule = {
  id: 'question-without-verb',
  name: 'missing verb in question',
  description: 'This question appears to miss a verb.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bwhen|where|who\b\s+.*[a-z0-9].*\s+\./gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This question appears to miss a verb.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
