import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Possible agreement error: 'many/several/few' + singular countable noun
 * 
 * Source: LanguageTool (MANY_NN)
 * Category: grammar
 */
export const manyNnRule: GrammarRule = {
  id: 'many-nn',
  name: 'Possible agreement error: \'many/several/few\' + singular countable noun',
  description: 'Possible agreement error. The noun \'\' seems to be countable; consider using: \\1 \\2 .',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmany|several|few|various\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Possible agreement error. The noun \'\' seems to be countable; consider using: \\1 \\2 .',
        suggestions: ["\\1 \\2"],
      });
    }
    
    return issues;
  },
};
