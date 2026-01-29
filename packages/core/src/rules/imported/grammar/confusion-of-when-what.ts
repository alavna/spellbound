import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * When (What) can be done about something
 * 
 * Source: LanguageTool (CONFUSION_OF_WHEN_WHAT)
 * Category: grammar
 */
export const confusionOfWhenWhatRule: GrammarRule = {
  id: 'confusion-of-when-what',
  name: 'When (What) can be done about something',
  description: 'Did you mean what instead?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwhen\b\s+\S+\s+\bbe\b\s+\S+\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean what instead?',
        suggestions: ["what"],
      });
    }
    
    return issues;
  },
};
