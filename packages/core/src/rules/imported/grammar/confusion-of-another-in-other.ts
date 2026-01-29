import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * another (in other)
 * 
 * Source: LanguageTool (CONFUSION_OF_ANOTHER_IN_OTHER)
 * Category: grammar
 */
export const confusionOfAnotherInOtherRule: GrammarRule = {
  id: 'confusion-of-another-in-other',
  name: 'another (in other)',
  description: 'Did you mean in other words?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\banother\b\s+\bwords\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean in other words?',
        suggestions: ["in other words"],
      });
    }
    
    return issues;
  },
};
