import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * hover board (hoverboard)
 * 
 * Source: LanguageTool (HOVER_BOARD)
 * Category: grammar
 */
export const hoverBoardRule: GrammarRule = {
  id: 'hover-board',
  name: 'hover board (hoverboard)',
  description: 'The word \'hoverboard\' is written as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhover\b\s+\bboards?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word \'hoverboard\' is written as one word.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
