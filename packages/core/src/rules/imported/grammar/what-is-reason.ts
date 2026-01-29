import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * What is (the) reason?
 * 
 * Source: LanguageTool (WHAT_IS_REASON)
 * Category: grammar
 */
export const whatIsReasonRule: GrammarRule = {
  id: 'what-is-reason',
  name: 'What is (the) reason?',
  description: 'It appears that an article is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwhat|which\b\s+\bis|was|'s\b\s+\breason|city|country|town|time|step|cause|price|option|cost|solution|answer|weather|motivation|goal|intention|meaning|name|question|problem\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that an article is missing.',
        suggestions: ["the \\3 \\4","a \\3 \\4"],
      });
    }
    
    return issues;
  },
};
