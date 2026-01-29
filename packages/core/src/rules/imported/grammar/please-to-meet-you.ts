import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Please(d) to meet you
 * 
 * Source: LanguageTool (PLEASE_TO_MEET_YOU)
 * Category: grammar
 */
export const pleaseToMeetYouRule: GrammarRule = {
  id: 'please-to-meet-you',
  name: 'Please(d) to meet you',
  description: 'Did you mean pleased?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bplease\b\s+\bto\b\s+\S+\s+\S+\s+\byou\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean pleased?',
        suggestions: ["pleased"],
      });
    }
    
    return issues;
  },
};
