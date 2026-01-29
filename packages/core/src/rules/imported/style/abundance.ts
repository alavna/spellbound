import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * abundance
 * 
 * Source: LanguageTool (ABUNDANCE)
 * Category: style
 */
export const abundanceRule: GrammarRule = {
  id: 'abundance',
  name: 'abundance',
  description: 'Use enough or plenty, or give specific amount.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\babundance\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Use enough or plenty, or give specific amount.',
        suggestions: ["enough","plenty"],
      });
    }
    
    return issues;
  },
};
