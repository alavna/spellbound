import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Sam's Club
 * 
 * Source: LanguageTool (SAMS_CLUB)
 * Category: grammar
 */
export const samsClubRule: GrammarRule = {
  id: 'sams-club',
  name: 'Sam\'s Club',
  description: 'Did you mean the retail warehouse Sam\'s Club (always spelled with a possessive apostrophe)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsams\b\s+\bclub\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the retail warehouse Sam\'s Club (always spelled with a possessive apostrophe)?',
        suggestions: ["Sam's Club"],
      });
    }
    
    return issues;
  },
};
