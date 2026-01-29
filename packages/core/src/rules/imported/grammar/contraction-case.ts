import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * inconsistent case in contraction (e.g. I'Ve)
 * 
 * Source: LanguageTool (CONTRACTION_CASE)
 * Category: grammar
 */
export const contractionCaseRule: GrammarRule = {
  id: 'contraction-case',
  name: 'inconsistent case in contraction (e.g. I\'Ve)',
  description: 'Please check your upper/lowercase spelling.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /'\s+\bLl|Re|Ve|lL|rE|vE\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Please check your upper/lowercase spelling.',
        suggestions: ["\\1\\2"],
      });
    }
    
    return issues;
  },
};
