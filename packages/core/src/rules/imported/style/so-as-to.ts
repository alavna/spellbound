import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * so as to (to)
 * 
 * Source: LanguageTool (SO_AS_TO)
 * Category: style
 */
export const soAsToRule: GrammarRule = {
  id: 'so-as-to',
  name: 'so as to (to)',
  description: '\'So as to\' expresses purpose and is used in formal texts. Consider using to.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bso\b\s+\bas\b\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\'So as to\' expresses purpose and is used in formal texts. Consider using to.',
        suggestions: ["to"],
      });
    }
    
    return issues;
  },
};
