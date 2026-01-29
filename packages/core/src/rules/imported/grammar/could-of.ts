import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * could of (have)
 * 
 * Source: LanguageTool (COULD_OF)
 * Category: grammar
 */
export const couldOfRule: GrammarRule = {
  id: 'could-of',
  name: 'could of (have)',
  description: 'Did you mean have? (\'\\1 \\2\' is probably an incorrect use of the verb phrase \'\\1 have\'; as contraction \"\\1\'ve\" sounds like \"could of\")',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcould|should|would\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean have? (\'\\1 \\2\' is probably an incorrect use of the verb phrase \'\\1 have\'; as contraction \"\\1\'ve\" sounds like \"could of\")',
        suggestions: ["have"],
      });
    }
    
    return issues;
  },
};
