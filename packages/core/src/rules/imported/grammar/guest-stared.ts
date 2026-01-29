import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * guest stared (guest-starred)
 * 
 * Source: LanguageTool (GUEST_STARED)
 * Category: grammar
 */
export const guestStaredRule: GrammarRule = {
  id: 'guest-stared',
  name: 'guest stared (guest-starred)',
  description: 'Did you mean guest-starred?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bguest\b\s+\bstared\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean guest-starred?',
        suggestions: ["guest-starred"],
      });
    }
    
    return issues;
  },
};
