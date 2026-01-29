import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * That cool (That is cool)
 * 
 * Source: LanguageTool (THAT_VERY_COOL)
 * Category: grammar
 */
export const thatVeryCoolRule: GrammarRule = {
  id: 'that-very-cool',
  name: 'That cool (That is cool)',
  description: 'Did you mean \\4 is or \\4 was?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bthat|this\b\s+&short_adjectives;|&optional_short_adjectives;|awesome|beautiful|ready|(im)?possible|different|wrong|fine|ok(ay)?|(al)?right|available|ready|dangerous|enough|sexy|delicious|excellent|annoying|(in)?correct|dizzy\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\4 is or \\4 was?',
        suggestions: ["\\4 is","\\4 was"],
      });
    }
    
    return issues;
  },
};
