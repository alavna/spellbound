import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Collocation: take (have) a bath/nap
 * 
 * Source: LanguageTool (TAKE_A_BATH)
 * Category: grammar
 */
export const takeABathRule: GrammarRule = {
  id: 'take-a-bath',
  name: 'Collocation: take (have) a bath/nap',
  description: 'In British English, the usual verb to go with \'\\3\' is have.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\ba\b\s+\S+\s+\bbath|nap|rest|vacation\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'In British English, the usual verb to go with \'\\3\' is have.',
        suggestions: ["have"],
      });
    }
    
    return issues;
  },
};
