import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Apostrophe in dates
 * 
 * Source: LanguageTool (APOSTROPHE_IN_DATES)
 * Category: grammar
 */
export const apostropheInDatesRule: GrammarRule = {
  id: 'apostrophe-in-dates',
  name: 'Apostrophe in dates',
  description: 'Apostrophes aren\'t needed for decades.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /'s\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Apostrophes aren\'t needed for decades.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
