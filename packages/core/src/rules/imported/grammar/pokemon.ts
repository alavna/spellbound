import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Pokémon
 * 
 * Source: LanguageTool (POKEMON)
 * Category: grammar
 */
export const pokemonRule: GrammarRule = {
  id: 'pokemon',
  name: 'Pokémon',
  description: 'The name of this game or TV show is spelled with an accent.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bPokemon\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The name of this game or TV show is spelled with an accent.',
        suggestions: ["Pokémon"],
      });
    }
    
    return issues;
  },
};
