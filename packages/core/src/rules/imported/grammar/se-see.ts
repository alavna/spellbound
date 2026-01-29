import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * se vs see
 * 
 * Source: LanguageTool (SE_SEE)
 * Category: grammar
 */
export const seSeeRule: GrammarRule = {
  id: 'se-see',
  name: 'se vs see',
  description: 'Did you mean See?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bSe\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean See?',
        suggestions: ["See"],
      });
    }
    
    return issues;
  },
};
