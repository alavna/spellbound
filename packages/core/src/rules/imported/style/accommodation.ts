import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * accommodation
 * 
 * Source: LanguageTool (ACCOMMODATION)
 * Category: style
 */
export const accommodationRule: GrammarRule = {
  id: 'accommodation',
  name: 'accommodation',
  description: 'room.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'room.',
        suggestions: ["room"],
      });
    }
    
    return issues;
  },
};
