import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * movie theater/cinema
 * 
 * Source: LanguageTool (MOVIE_THEATER_CINEMA)
 * Category: grammar
 */
export const movieTheaterCinemaRule: GrammarRule = {
  id: 'movie-theater-cinema',
  name: 'movie theater/cinema',
  description: 'The term \'\\1 \\2\' is common for American English. Did you mean cinema?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmovie\b\s+\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The term \'\\1 \\2\' is common for American English. Did you mean cinema?',
        suggestions: ["cinema"],
      });
    }
    
    return issues;
  },
};
