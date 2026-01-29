import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * land lord (landlord)
 * 
 * Source: LanguageTool (LAND_COMPOUNDS)
 * Category: grammar
 */
export const landCompoundsRule: GrammarRule = {
  id: 'land-compounds',
  name: 'land lord (landlord)',
  description: 'The word \\1 is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bland\b\s+\bfall|slide|lords?|marks?|form|lady\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word \\1 is spelled as one word.',
        suggestions: ["\\1"],
      });
    }
    
    return issues;
  },
};
