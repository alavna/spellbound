import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Sound (sounds) great
 * 
 * Source: LanguageTool (SOUND_GREAT)
 * Category: grammar
 */
export const soundGreatRule: GrammarRule = {
  id: 'sound-great',
  name: 'Sound (sounds) great',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+[Ss]ound|[Ss]eem|[Ll]ook\b\s+&short_adjectives;|&optional_short_adjectives;|awesome|beautiful|ready|(im)?possible|different|wrong|fine|ok(ay)?|alright|available|ready|dangerous|enough|sexy|delicious|excellent|annoying|(in)?correct|dizzy\b\s+\bto|for|\.|!|,|because|but|in|on|with(out)?|at|t?here|from\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean ?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
