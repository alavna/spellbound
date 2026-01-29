import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * pre 2010 (pre-2010)
 * 
 * Source: LanguageTool (PRE_YEAR_HYPHEN)
 * Category: grammar
 */
export const preYearHyphenRule: GrammarRule = {
  id: 'pre-year-hyphen',
  name: 'pre 2010 (pre-2010)',
  description: 'The adjective \\1-\\2 (= before the year \\2) is spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bpre\b\s+1\d{3}|20\d{2}/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The adjective \\1-\\2 (= before the year \\2) is spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
