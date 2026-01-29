import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * We visited them afterwards (afterward)
 * 
 * Source: LanguageTool (AFTERWARDS_US)
 * Category: grammar
 */
export const afterwardsUsRule: GrammarRule = {
  id: 'afterwards-us',
  name: 'We visited them afterwards (afterward)',
  description: 'In American English, \'afterward\' is the preferred variant. \'Afterwards\' is more commonly used in British English and other dialects.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bafterwards\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'In American English, \'afterward\' is the preferred variant. \'Afterwards\' is more commonly used in British English and other dialects.',
        suggestions: ["afterward"],
      });
    }
    
    return issues;
  },
};
