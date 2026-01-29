import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * spell checker.”. (checker.”)
 * 
 * Source: LanguageTool (PERIOD_QUOTE_PERIOD)
 * Category: grammar
 */
export const periodQuotePeriodRule: GrammarRule = {
  id: 'period-quote-period',
  name: 'spell checker.”. (checker.”)',
  description: 'Unless punctuating an abbreviation or acronym, periods should not appear both inside and outside of a quote.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\.\s+["”]\s+\./gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Unless punctuating an abbreviation or acronym, periods should not appear both inside and outside of a quote.',
        suggestions: ["\\1\\2\\3"],
      });
    }
    
    return issues;
  },
};
