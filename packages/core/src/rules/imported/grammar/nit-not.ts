import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * nit vs not
 * 
 * Source: LanguageTool (NIT_NOT)
 * Category: grammar
 */
export const nitNotRule: GrammarRule = {
  id: 'nit-not',
  name: 'nit vs not',
  description: 'Did you mean not?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean not?',
        suggestions: ["not"],
      });
    }
    
    return issues;
  },
};
