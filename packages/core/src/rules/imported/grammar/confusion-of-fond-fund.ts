import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * confusion of fond/fund
 * 
 * Source: LanguageTool (CONFUSION_OF_FOND_FUND)
 * Category: grammar
 */
export const confusionOfFondFundRule: GrammarRule = {
  id: 'confusion-of-fond-fund',
  name: 'confusion of fond/fund',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bexecutor|exchange-traded|growth|hedge|index|vulture\b\s+\bf[io]nds?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean ?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
