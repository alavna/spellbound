import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * true to her words (word)
 * 
 * Source: LanguageTool (TRUE_TO_WORD)
 * Category: grammar
 */
export const trueToWordRule: GrammarRule = {
  id: 'true-to-word',
  name: 'true to her words (word)',
  description: 'Did you mean the idiom \'true to one\'s word\' (=keep one\'s promise)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\btrue\b\s+\bto\b\s+\S+\s+\bwords\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the idiom \'true to one\'s word\' (=keep one\'s promise)?',
        suggestions: ["word"],
      });
    }
    
    return issues;
  },
};
