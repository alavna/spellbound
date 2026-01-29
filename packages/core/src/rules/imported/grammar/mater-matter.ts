import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * mater vs matter
 * 
 * Source: LanguageTool (MATER_MATTER)
 * Category: grammar
 */
export const materMatterRule: GrammarRule = {
  id: 'mater-matter',
  name: 'mater vs matter',
  description: 'Did you mean matter?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\S+\s+\bmater\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean matter?',
        suggestions: ["matter"],
      });
    }
    
    return issues;
  },
};
