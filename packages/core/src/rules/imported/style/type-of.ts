import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * type of (omit)
 * 
 * Source: LanguageTool (TYPE_OF)
 * Category: style
 */
export const typeOfRule: GrammarRule = {
  id: 'type-of',
  name: 'type of (omit)',
  description: 'Try removing the phrase \"\\1 \\2\".',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\btype\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Try removing the phrase \"\\1 \\2\".',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
