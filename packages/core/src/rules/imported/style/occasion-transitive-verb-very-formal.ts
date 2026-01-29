import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * transitive verb 'occasion' is very formal
 * 
 * Source: LanguageTool (OCCASION_TRANSITIVE_VERB_VERY_FORMAL)
 * Category: style
 */
export const occasionTransitiveVerbVeryFormalRule: GrammarRule = {
  id: 'occasion-transitive-verb-very-formal',
  name: 'transitive verb \'occasion\' is very formal',
  description: 'The transitive verb \"\" is a very formal word choice. Consider a more common synonym.',
  category: 'style',
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
        message: 'The transitive verb \"\" is a very formal word choice. Consider a more common synonym.',
        suggestions: ["cause","induce"],
      });
    }
    
    return issues;
  },
};
