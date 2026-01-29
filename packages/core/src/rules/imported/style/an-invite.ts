import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * an invite (invitation)
 * 
 * Source: LanguageTool (AN_INVITE)
 * Category: style
 */
export const anInviteRule: GrammarRule = {
  id: 'an-invite',
  name: 'an invite (invitation)',
  description: 'The noun invitation is usually used instead of \'invite\' in formal writing.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban\b\s+\binvite\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun invitation is usually used instead of \'invite\' in formal writing.',
        suggestions: ["invitation"],
      });
    }
    
    return issues;
  },
};
