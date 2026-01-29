import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing apostrophe in 'seasons greetings'
 * 
 * Source: LanguageTool (SEASONS_GREETINGS)
 * Category: grammar
 */
export const seasonsGreetingsRule: GrammarRule = {
  id: 'seasons-greetings',
  name: 'missing apostrophe in \'seasons greetings\'',
  description: 'This idiom is spelled with a possessive apostrophe.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bseasons\b\s+\bgreetings\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This idiom is spelled with a possessive apostrophe.',
        suggestions: ["\\2"],
      });
    }
    
    return issues;
  },
};
