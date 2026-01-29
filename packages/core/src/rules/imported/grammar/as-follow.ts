import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * as follow (follows)
 * 
 * Source: LanguageTool (AS_FOLLOW)
 * Category: grammar
 */
export const asFollowRule: GrammarRule = {
  id: 'as-follow',
  name: 'as follow (follows)',
  description: 'Did you mean as follows?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bas\b\s+\bfollow\b/gi;
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
