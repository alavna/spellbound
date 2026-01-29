import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * VB a while (awhile)
 * 
 * Source: LanguageTool (VB_A_WHILE)
 * Category: grammar
 */
export const vbAWhileRule: GrammarRule = {
  id: 'vb-a-while',
  name: 'VB a while (awhile)',
  description: 'Did you mean to use the adverb \'awhile\' instead of the noun phrase \'a while\'?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ba\b\s+\bwhile\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean to use the adverb \'awhile\' instead of the noun phrase \'a while\'?',
        suggestions: ["awhile"],
      });
    }
    
    return issues;
  },
};
