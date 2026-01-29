import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Style: 'possible' after 'possibility'
 * 
 * Source: LanguageTool (POSSIBILTY_POSSIBLE)
 * Category: style
 */
export const possibiltyPossibleRule: GrammarRule = {
  id: 'possibilty-possible',
  name: 'Style: \'possible\' after \'possibility\'',
  description: 'Before \'\\2\', use a word such as chance or opportunity. Alternatively, keep \'\\1\' and replace \'\\2\'.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bpossible\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Before \'\\2\', use a word such as chance or opportunity. Alternatively, keep \'\\1\' and replace \'\\2\'.',
        suggestions: ["chance","opportunity"],
      });
    }
    
    return issues;
  },
};
