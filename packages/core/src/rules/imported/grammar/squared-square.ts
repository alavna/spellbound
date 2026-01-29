import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * squared (square)
 * 
 * Source: LanguageTool (SQUARED_SQUARE)
 * Category: grammar
 */
export const squaredSquareRule: GrammarRule = {
  id: 'squared-square',
  name: 'squared (square)',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsquared\b\s+\bfeet|(kilo)?met(er|re)s?|miles?|inch(es)?/gi;
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
