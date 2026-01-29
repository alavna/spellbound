import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * He (The|Her) question is whether we can extract...
 * 
 * Source: LanguageTool (HE_QUESTION)
 * Category: grammar
 */
export const heQuestionRule: GrammarRule = {
  id: 'he-question',
  name: 'He (The|Her) question is whether we can extract...',
  description: 'Potential typo detected.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhe\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Potential typo detected.',
        suggestions: ["the","her"],
      });
    }
    
    return issues;
  },
};
