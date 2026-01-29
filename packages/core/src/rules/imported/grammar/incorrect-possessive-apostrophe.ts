import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * This weeks' (week's)
 * 
 * Source: LanguageTool (INCORRECT_POSSESSIVE_APOSTROPHE)
 * Category: grammar
 */
export const incorrectPossessiveApostropheRule: GrammarRule = {
  id: 'incorrect-possessive-apostrophe',
  name: 'This weeks\' (week\'s)',
  description: 'The possessive apostrophe may be misplaced.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthis\b\s+\bweeks|week-?ends|months|years\b\s+&apostrophe;\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The possessive apostrophe may be misplaced.',
        suggestions: ["\\1 \\3s"],
      });
    }
    
    return issues;
  },
};
