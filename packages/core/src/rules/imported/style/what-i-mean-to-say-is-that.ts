import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * what I mean to say is that (omit)
 * 
 * Source: LanguageTool (WHAT_I_MEAN_TO_SAY_IS_THAT)
 * Category: style
 */
export const whatIMeanToSayIsThatRule: GrammarRule = {
  id: 'what-i-mean-to-say-is-that',
  name: 'what I mean to say is that (omit)',
  description: 'Try removing the phrase.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwhat\b\s+\byes\b\s+\byes\b\s+\bto\b\s+\bsay\b\s+\bis\b\s+\bthat\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Try removing the phrase.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
