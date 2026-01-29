import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * out of place (out-of-place) etc.
 * 
 * Source: LanguageTool (OUT_OF_PLACE)
 * Category: grammar
 */
export const outOfPlaceRule: GrammarRule = {
  id: 'out-of-place',
  name: 'out of place (out-of-place) etc.',
  description: 'Did you mean out-of-\\4?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban?|the|my|his|her|their|our|your|'s\b\s+\S+\s+\bout\b\s+\bof\b\s+\bplace|doors?|band|bounds|courts?|stock|home|town|reach|network|office|scope|state|wedlock|pockets?|order\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean out-of-\\4?',
        suggestions: ["out-of-\\4"],
      });
    }
    
    return issues;
  },
};
