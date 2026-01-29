import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Jack Daniel's
 * 
 * Source: LanguageTool (JACK_DANIELS)
 * Category: grammar
 */
export const jackDanielsRule: GrammarRule = {
  id: 'jack-daniels',
  name: 'Jack Daniel\'s',
  description: 'Did you mean the whiskey brand Jack Daniel\'s (capitalized and spelled with a possessive apostrophe)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bJack\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the whiskey brand Jack Daniel\'s (capitalized and spelled with a possessive apostrophe)?',
        suggestions: ["Jack Daniel's"],
      });
    }
    
    return issues;
  },
};
