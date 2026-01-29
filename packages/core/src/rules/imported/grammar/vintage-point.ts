import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * vintage (vantage) point
 * 
 * Source: LanguageTool (VINTAGE_POINT)
 * Category: grammar
 */
export const vintagePointRule: GrammarRule = {
  id: 'vintage-point',
  name: 'vintage (vantage) point',
  description: 'Did you mean vantage point?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bvintage\b\s+\bpoint\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean vantage point?',
        suggestions: ["vantage point"],
      });
    }
    
    return issues;
  },
};
