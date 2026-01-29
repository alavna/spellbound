import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * bring SOMEBODY in/to
 * 
 * Source: LanguageTool (BROUGHT_THEM_IN_THE_AIRPORT)
 * Category: grammar
 */
export const broughtThemInTheAirportRule: GrammarRule = {
  id: 'brought-them-in-the-airport',
  name: 'bring SOMEBODY in/to',
  description: 'The usual collocation for \"\\1\" is \"to\", not \"\\3\". Did you mean \\1 \\2 to \\4 \\5?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\S+\s+\bin|at\b\s+\S+\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The usual collocation for \"\\1\" is \"to\", not \"\\3\". Did you mean \\1 \\2 to \\4 \\5?',
        suggestions: ["\\1 \\2 to \\4 \\5"],
      });
    }
    
    return issues;
  },
};
