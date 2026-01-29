import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * must of the time (most of the time)
 * 
 * Source: LanguageTool (MUST_OF_THE_TIME_MOST_OF_THE_TIME)
 * Category: grammar
 */
export const mustOfTheTimeMostOfTheTimeRule: GrammarRule = {
  id: 'must-of-the-time-most-of-the-time',
  name: 'must of the time (most of the time)',
  description: 'Did you mean most \\2 \\3 \\4?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmust\b\s+\bof\b\s+\bthe\b\s+\btimes?|people\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean most \\2 \\3 \\4?',
        suggestions: ["most \\2 \\3 \\4"],
      });
    }
    
    return issues;
  },
};
