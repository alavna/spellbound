import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Comparison with 'the same ... as'
 * 
 * Source: LanguageTool (THE_SAME_AS)
 * Category: grammar
 */
export const theSameAsRule: GrammarRule = {
  id: 'the-same-as',
  name: 'Comparison with \'the same ... as\'',
  description: 'Comparison is written \'the same ... as\'.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthe\b\s+\bsame\b\s+\blike|than\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Comparison is written \'the same ... as\'.',
        suggestions: ["as"],
      });
    }
    
    return issues;
  },
};
