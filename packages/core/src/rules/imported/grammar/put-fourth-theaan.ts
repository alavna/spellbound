import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * put fourth (forth) the
 * 
 * Source: LanguageTool (PUT_FOURTH_THEAAN)
 * Category: grammar
 */
export const putFourthTheaanRule: GrammarRule = {
  id: 'put-fourth-theaan',
  name: 'put fourth (forth) the',
  description: 'Did you mean put forth ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bput\b\s+\bfourth\b\s+\bthe|an?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean put forth ?',
        suggestions: ["put forth"],
      });
    }
    
    return issues;
  },
};
