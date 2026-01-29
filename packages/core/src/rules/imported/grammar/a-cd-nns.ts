import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I have a 20 cars (I have 20 cars)
 * 
 * Source: LanguageTool (A_CD_NNS)
 * Category: grammar
 */
export const aCdNnsRule: GrammarRule = {
  id: 'a-cd-nns',
  name: 'I have a 20 cars (I have 20 cars)',
  description: 'The article \"\\1\" is not needed here.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban?\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The article \"\\1\" is not needed here.',
        suggestions: ["\\2"],
      });
    }
    
    return issues;
  },
};
