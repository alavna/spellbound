import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * and so fourth (forth)
 * 
 * Source: LanguageTool (AND_SO_FOURTH)
 * Category: grammar
 */
export const andSoFourthRule: GrammarRule = {
  id: 'and-so-fourth',
  name: 'and so fourth (forth)',
  description: 'Did you mean and so forth?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\band\b\s+\bso\b\s+\bfourth\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean and so forth?',
        suggestions: ["and so forth"],
      });
    }
    
    return issues;
  },
};
