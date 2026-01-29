import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Tiflis
 * 
 * Source: LanguageTool (TIFLIS)
 * Category: style
 */
export const tiflisRule: GrammarRule = {
  id: 'tiflis',
  name: 'Tiflis',
  description: 'The capital city of Georgia is today known under the name Tbilisi.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bTiflis\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The capital city of Georgia is today known under the name Tbilisi.',
        suggestions: ["Tbilisi"],
      });
    }
    
    return issues;
  },
};
