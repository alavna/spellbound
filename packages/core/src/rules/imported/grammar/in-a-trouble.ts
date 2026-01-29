import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * In a trouble
 * 
 * Source: LanguageTool (IN_A_TROUBLE)
 * Category: grammar
 */
export const inATroubleRule: GrammarRule = {
  id: 'in-a-trouble',
  name: 'In a trouble',
  description: 'The noun \\2 is uncountable and doesn\'t require an article.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban?\s+\btrouble\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun \\2 is uncountable and doesn\'t require an article.',
        suggestions: ["\\2"],
      });
    }
    
    return issues;
  },
};
