import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * summery vs summary
 * 
 * Source: LanguageTool (SUMMERY_SUMMARY)
 * Category: grammar
 */
export const summerySummaryRule: GrammarRule = {
  id: 'summery-summary',
  name: 'summery vs summary',
  description: '\"\\1\" (= fit for summer) is an adjective. Did you mean summary (= abstract)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsummery\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\"\\1\" (= fit for summer) is an adjective. Did you mean summary (= abstract)?',
        suggestions: ["summary"],
      });
    }
    
    return issues;
  },
};
