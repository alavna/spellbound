import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Chris rose from his chair an(d) applauded
 * 
 * Source: LanguageTool (PAST_AN_PAST)
 * Category: grammar
 */
export const pastAnPastRule: GrammarRule = {
  id: 'past-an-past',
  name: 'Chris rose from his chair an(d) applauded',
  description: 'Possible typo detected: Did you mean to write \"and\" here?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\S+\s+\ban\b\s+\S+\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Possible typo detected: Did you mean to write \"and\" here?',
        suggestions: ["and"],
      });
    }
    
    return issues;
  },
};
