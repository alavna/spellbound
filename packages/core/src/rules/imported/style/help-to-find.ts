import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * help to find (help find)
 * 
 * Source: LanguageTool (HELP_TO_FIND)
 * Category: style
 */
export const helpToFindRule: GrammarRule = {
  id: 'help-to-find',
  name: 'help to find (help find)',
  description: 'In informal texts, \'to\' is not necessary. Do you mean \\1 \\2 \\4?',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\S+\s+\bto\b\s+\bfind\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'In informal texts, \'to\' is not necessary. Do you mean \\1 \\2 \\4?',
        suggestions: ["\\1 \\2 \\4"],
      });
    }
    
    return issues;
  },
};
