import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * foot print (footprint)
 * 
 * Source: LanguageTool (PRINT_COMPOUNDS)
 * Category: grammar
 */
export const printCompoundsRule: GrammarRule = {
  id: 'print-compounds',
  name: 'foot print (footprint)',
  description: 'The noun is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfoot|thumb|voice|blue|finger|news\b\s+\bprints?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun is spelled as one word.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
