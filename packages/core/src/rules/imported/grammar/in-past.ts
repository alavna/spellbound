import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Missing definite article referring to a time period
 * 
 * Source: LanguageTool (IN_PAST)
 * Category: grammar
 */
export const inPastRule: GrammarRule = {
  id: 'in-past',
  name: 'Missing definite article referring to a time period',
  description: 'Did you mean: the ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin\b\s+\bpast\b\s+\.,\.\..:;\./gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean: the ?',
        suggestions: ["the"],
      });
    }
    
    return issues;
  },
};
