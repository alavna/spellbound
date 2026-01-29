import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * capitalization of 'Celsius'
 * 
 * Source: LanguageTool (CELSIUS)
 * Category: grammar
 */
export const celsiusRule: GrammarRule = {
  id: 'celsius',
  name: 'capitalization of \'Celsius\'',
  description: 'The name for this temperature scale is always capitalized.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcelsius|fahrenheit\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The name for this temperature scale is always capitalized.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
