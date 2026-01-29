import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * period after abbreviation 'etc.'
 * 
 * Source: LanguageTool (ETC_PERIOD)
 * Category: style
 */
export const etcPeriodRule: GrammarRule = {
  id: 'etc-period',
  name: 'period after abbreviation \'etc.\'',
  description: 'In American English, abbreviations like \"etc.\" require a period.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\betc\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'In American English, abbreviations like \"etc.\" require a period.',
        suggestions: ["etc."],
      });
    }
    
    return issues;
  },
};
