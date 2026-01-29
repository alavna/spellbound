import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Pokémon Go
 * 
 * Source: LanguageTool (POKEMON_GO)
 * Category: grammar
 */
export const pokemonGoRule: GrammarRule = {
  id: 'pokemon-go',
  name: 'Pokémon Go',
  description: 'The mobile game Pokémon is usually capitalized.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bPok[eé]mon\b\s+\bgo\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The mobile game Pokémon is usually capitalized.',
        suggestions: ["Pokémon"],
      });
    }
    
    return issues;
  },
};
