import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * My life as (has|was) gotten a lot busier in the last month
 * 
 * Source: LanguageTool (TYPO_AS_HAS_WAS)
 * Category: grammar
 */
export const typoAsHasWasRule: GrammarRule = {
  id: 'typo-as-has-was',
  name: 'My life as (has|was) gotten a lot busier in the last month',
  description: 'Did you mean to write \'has\' or \'was\'?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bas\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean to write \'has\' or \'was\'?',
        suggestions: ["has \\3","was \\3"],
      });
    }
    
    return issues;
  },
};
