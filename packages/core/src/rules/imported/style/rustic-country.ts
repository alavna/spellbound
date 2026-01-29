import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * rustic country (rustic)
 * 
 * Source: LanguageTool (RUSTIC_COUNTRY)
 * Category: style
 */
export const rusticCountryRule: GrammarRule = {
  id: 'rustic-country',
  name: 'rustic country (rustic)',
  description: 'Consider using \\1.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\brustic\b\s+\bcountry\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using \\1.',
        suggestions: ["\\1"],
      });
    }
    
    return issues;
  },
};
