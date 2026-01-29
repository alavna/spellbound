import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing apostrophe in 'International Workers Day'
 * 
 * Source: LanguageTool (INTERNATIONAL_WORKERS_DAY_APOSTROPHE)
 * Category: grammar
 */
export const internationalWorkersDayApostropheRule: GrammarRule = {
  id: 'international-workers-day-apostrophe',
  name: 'missing apostrophe in \'International Workers Day\'',
  description: 'It appears that a possessive apostrophe is missing, if you mean the legal holiday International Workers\' Day.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\binternational\b\s+\bworkers\b\s+\bday\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that a possessive apostrophe is missing, if you mean the legal holiday International Workers\' Day.',
        suggestions: ["International Workers' Day"],
      });
    }
    
    return issues;
  },
};
