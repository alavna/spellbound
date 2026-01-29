import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * super market (supermarket)
 * 
 * Source: LanguageTool (SUPER_COMPOUNDS)
 * Category: grammar
 */
export const superCompoundsRule: GrammarRule = {
  id: 'super-compounds',
  name: 'super market (supermarket)',
  description: 'This is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsuper\b\s+\bcells?|markets?|moons?|delegates?|tankers?|glues?|spreaders?|speading|hero(es)?|chargers?|models?|charge(d|s)?|charging|highways?|stars?|intelligence|powers?|naturals?|ordinate[sd]?|massive|users?|impose[ds]?|imposing|impositions?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This is normally spelled as one word.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
