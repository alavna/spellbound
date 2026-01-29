import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * as of yet (yet)
 * 
 * Source: LanguageTool (AS_OF_YET)
 * Category: style
 */
export const asOfYetRule: GrammarRule = {
  id: 'as-of-yet',
  name: 'as of yet (yet)',
  description: 'Consider using yet or as yet.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bas\b\s+\bof\b\s+\byet\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using yet or as yet.',
        suggestions: ["yet","as yet"],
      });
    }
    
    return issues;
  },
};
