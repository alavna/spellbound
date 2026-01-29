import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Collocation: consider (about)
 * 
 * Source: LanguageTool (MENTION_ABOUT)
 * Category: grammar
 */
export const mentionAboutRule: GrammarRule = {
  id: 'mention-about',
  name: 'Collocation: consider (about)',
  description: 'Did you mean simply \\1 \\3? You do not need the word \"about\" here.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\babout\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean simply \\1 \\3? You do not need the word \"about\" here.',
        suggestions: ["\\1 \\3"],
      });
    }
    
    return issues;
  },
};
