import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * figure head (figurehead)
 * 
 * Source: LanguageTool (FIGURE_HEAD)
 * Category: grammar
 */
export const figureHeadRule: GrammarRule = {
  id: 'figure-head',
  name: 'figure head (figurehead)',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfigure\b\s+\bheads?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean ?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
