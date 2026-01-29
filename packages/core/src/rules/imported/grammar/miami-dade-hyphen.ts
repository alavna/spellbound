import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Miami-Dade
 * 
 * Source: LanguageTool (MIAMI_DADE_HYPHEN)
 * Category: grammar
 */
export const miamiDadeHyphenRule: GrammarRule = {
  id: 'miami-dade-hyphen',
  name: 'Miami-Dade',
  description: 'The name of this US county is spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmiami\b\s+\bdade\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The name of this US county is spelled with a hyphen.',
        suggestions: ["Miami-Dade"],
      });
    }
    
    return issues;
  },
};
