import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * boy friend (boyfriend)
 * 
 * Source: LanguageTool (FRIEND_COMPOUNDS)
 * Category: grammar
 */
export const friendCompoundsRule: GrammarRule = {
  id: 'friend-compounds',
  name: 'boy friend (boyfriend)',
  description: 'This is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bboy|girl\b\s+\bfriends?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This is normally spelled as one word.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
