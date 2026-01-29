import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Plural form of numbers in 'two dozens of' (two dozen)
 * 
 * Source: LanguageTool (CD_DOZENS_OF)
 * Category: grammar
 */
export const cdDozensOfRule: GrammarRule = {
  id: 'cd-dozens-of',
  name: 'Plural form of numbers in \'two dozens of\' (two dozen)',
  description: 'Use a singular form of the numeral here.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bdozens|hundreds|thousands|[bm]illions\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Use a singular form of the numeral here.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
