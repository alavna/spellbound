import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * back and fourth (back and forth)
 * 
 * Source: LanguageTool (BACK_AND_FOURTH)
 * Category: grammar
 */
export const backAndFourthRule: GrammarRule = {
  id: 'back-and-fourth',
  name: 'back and fourth (back and forth)',
  description: 'Did you mean back and forth?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bback\b\s+\band\b\s+\bfourth\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean back and forth?',
        suggestions: ["back and forth"],
      });
    }
    
    return issues;
  },
};
