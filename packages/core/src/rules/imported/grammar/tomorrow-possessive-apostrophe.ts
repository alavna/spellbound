import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Missing possessive: Todays (today's) meeting
 * 
 * Source: LanguageTool (TOMORROW_POSSESSIVE_APOSTROPHE)
 * Category: grammar
 */
export const tomorrowPossessiveApostropheRule: GrammarRule = {
  id: 'tomorrow-possessive-apostrophe',
  name: 'Missing possessive: Todays (today\'s) meeting',
  description: 'It seems that a possessive apostrophe is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\btomorrows|yesterdays|todays|tonights\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It seems that a possessive apostrophe is missing.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
