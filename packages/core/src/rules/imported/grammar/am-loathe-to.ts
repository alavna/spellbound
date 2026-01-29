import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * am loathe (loath) to
 * 
 * Source: LanguageTool (AM_LOATHE_TO)
 * Category: grammar
 */
export const amLoatheToRule: GrammarRule = {
  id: 'am-loathe-to',
  name: 'am loathe (loath) to',
  description: 'Did you mean the adjective loath instead of the adverb \"\\3\"?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\S+\s+\bloathe\b\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the adjective loath instead of the adverb \"\\3\"?',
        suggestions: ["loath"],
      });
    }
    
    return issues;
  },
};
