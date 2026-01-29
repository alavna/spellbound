import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * an then (and then)
 * 
 * Source: LanguageTool (AN_THEN)
 * Category: grammar
 */
export const anThenRule: GrammarRule = {
  id: 'an-then',
  name: 'an then (and then)',
  description: 'Possible typo. Did you mean and \\2?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bth(en|is|at|[eo]se|ere)/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Possible typo. Did you mean and \\2?',
        suggestions: ["and \\2"],
      });
    }
    
    return issues;
  },
};
