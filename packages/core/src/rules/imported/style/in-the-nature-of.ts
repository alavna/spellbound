import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * in the nature of (like)
 * 
 * Source: LanguageTool (IN_THE_NATURE_OF)
 * Category: style
 */
export const inTheNatureOfRule: GrammarRule = {
  id: 'in-the-nature-of',
  name: 'in the nature of (like)',
  description: 'Did you mean like?',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin\b\s+\bthe\b\s+\bnature\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean like?',
        suggestions: ["like"],
      });
    }
    
    return issues;
  },
};
