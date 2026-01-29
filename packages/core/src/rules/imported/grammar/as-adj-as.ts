import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Comparison with 'as'
 * 
 * Source: LanguageTool (AS_ADJ_AS)
 * Category: grammar
 */
export const asAdjAsRule: GrammarRule = {
  id: 'as-adj-as',
  name: 'Comparison with \'as\'',
  description: 'Comparison is written \'as \\2 as\'.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bas\b\s+\blike|th[ae]n\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Comparison is written \'as \\2 as\'.',
        suggestions: ["as"],
      });
    }
    
    return issues;
  },
};
