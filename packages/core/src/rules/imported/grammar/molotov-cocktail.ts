import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * molotov (Molotov) cocktail
 * 
 * Source: LanguageTool (MOLOTOV_COCKTAIL)
 * Category: grammar
 */
export const molotovCocktailRule: GrammarRule = {
  id: 'molotov-cocktail',
  name: 'molotov (Molotov) cocktail',
  description: 'Did you mean Molotov \\2 (= crude bomb, \"Molotov\" needs to be capitalized)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmolotov\b\s+\bcocktails?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean Molotov \\2 (= crude bomb, \"Molotov\" needs to be capitalized)?',
        suggestions: ["Molotov \\2"],
      });
    }
    
    return issues;
  },
};
