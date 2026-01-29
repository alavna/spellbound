import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Omicron
 * 
 * Source: LanguageTool (OMICRON_VARIANT)
 * Category: grammar
 */
export const omicronVariantRule: GrammarRule = {
  id: 'omicron-variant',
  name: 'Omicron',
  description: 'The name of this virus variant is normally capitalized.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bomicron|delta\b\s+\bvariants?|virus|mutations?|infected|infections?|diseases?|corona|covid-?19/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The name of this virus variant is normally capitalized.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
