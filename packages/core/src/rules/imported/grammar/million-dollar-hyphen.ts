import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Missing hyphen in 'billion dollar'
 * 
 * Source: LanguageTool (MILLION_DOLLAR_HYPHEN)
 * Category: grammar
 */
export const millionDollarHyphenRule: GrammarRule = {
  id: 'million-dollar-hyphen',
  name: 'Missing hyphen in \'billion dollar\'',
  description: 'It appears that a hyphen is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /(multi)?[mb]illion|(multi)?trillion|thousand\b\s+\bdollar|euro|pound\b\s+\bhouses?|ideas?|apps?|compan(y|ies)|corporates?|start-?ups?|business|corporations?|bills?|cars?|mansions?|enterprises?|questions?|industry|plans?|series|yachts?|ships?|sailboats?|boats?|mistakes?|offer\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that a hyphen is missing.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
