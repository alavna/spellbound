import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * manner vs matter
 * 
 * Source: LanguageTool (MANNER_MATTER)
 * Category: grammar
 */
export const mannerMatterRule: GrammarRule = {
  id: 'manner-matter',
  name: 'manner vs matter',
  description: 'Did you mean manner (= in a way)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin\b\s+\ban?\s+\bmatter\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean manner (= in a way)?',
        suggestions: ["manner"],
      });
    }
    
    return issues;
  },
};
