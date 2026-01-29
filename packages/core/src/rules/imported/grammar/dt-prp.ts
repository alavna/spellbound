import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * The you (you)
 * 
 * Source: LanguageTool (DT_PRP)
 * Category: grammar
 */
export const dtPrpRule: GrammarRule = {
  id: 'dt-prp',
  name: 'The you (you)',
  description: 'Using a determiner and a pronoun together is incorrect. Did you mean \\1 or \\2?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Using a determiner and a pronoun together is incorrect. Did you mean \\1 or \\2?',
        suggestions: ["\\1","\\2"],
      });
    }
    
    return issues;
  },
};
