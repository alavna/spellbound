import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * confusion of yet alone → let alone
 * 
 * Source: LanguageTool (CONFUSION_OF_YET_ALONE_LET_ALONE)
 * Category: grammar
 */
export const confusionOfYetAloneLetAloneRule: GrammarRule = {
  id: 'confusion-of-yet-alone-let-alone',
  name: 'confusion of yet alone → let alone',
  description: 'Did you mean let alone?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\balone\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean let alone?',
        suggestions: ["let alone"],
      });
    }
    
    return issues;
  },
};
