import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Plural of Pokémon
 * 
 * Source: LanguageTool (POKEMONS)
 * Category: grammar
 */
export const pokemonsRule: GrammarRule = {
  id: 'pokemons',
  name: 'Plural of Pokémon',
  description: 'The plural of \'Pokémon\' is Pokémon.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bPok[eé]mons\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The plural of \'Pokémon\' is Pokémon.',
        suggestions: ["Pokémon"],
      });
    }
    
    return issues;
  },
};
