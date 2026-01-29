import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * wide spread (widespread)
 * 
 * Source: LanguageTool (WIDE_COMPOUNDS)
 * Category: grammar
 */
export const wideCompoundsRule: GrammarRule = {
  id: 'wide-compounds',
  name: 'wide spread (widespread)',
  description: 'The adjective wide is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwide\b\s+\bspread|band|mouthed\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The adjective wide is spelled as one word.',
        suggestions: ["wide"],
      });
    }
    
    return issues;
  },
};
