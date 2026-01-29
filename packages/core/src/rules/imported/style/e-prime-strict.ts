import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Creative Writing: E-Prime: all 'to be' forms
 * 
 * Source: LanguageTool (E_PRIME_STRICT)
 * Category: style
 */
export const ePrimeStrictRule: GrammarRule = {
  id: 'e-prime-strict',
  name: 'Creative Writing: E-Prime: all \'to be\' forms',
  description: 'According to E-Prime, avoiding the use of the stative verb \'to be\' makes the communication clearer, more accurate, and less dogmatic. Use an alternative verb.',
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
        message: 'According to E-Prime, avoiding the use of the stative verb \'to be\' makes the communication clearer, more accurate, and less dogmatic. Use an alternative verb.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
