import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * try and (try to)
 * 
 * Source: LanguageTool (TRY_AND)
 * Category: style
 */
export const tryAndRule: GrammarRule = {
  id: 'try-and',
  name: 'try and (try to)',
  description: '\"Try and\" is common in colloquial speech, but try to is recommended for writing.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\btry\b\s+\band\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\"Try and\" is common in colloquial speech, but try to is recommended for writing.',
        suggestions: ["try to"],
      });
    }
    
    return issues;
  },
};
