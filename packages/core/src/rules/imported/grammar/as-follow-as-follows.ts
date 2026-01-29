import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 'as follow' (as follows)
 * 
 * Source: LanguageTool (AS_FOLLOW_AS_FOLLOWS)
 * Category: grammar
 */
export const asFollowAsFollowsRule: GrammarRule = {
  id: 'as-follow-as-follows',
  name: '\'as follow\' (as follows)',
  description: 'Did you mean as follows?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bas\b\s+\bfollow\b\s+\.\.\..:,—\.\-–\./gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean as follows?',
        suggestions: ["as follows"],
      });
    }
    
    return issues;
  },
};
