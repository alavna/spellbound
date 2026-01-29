import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * accused of a charge (charged with)
 * 
 * Source: LanguageTool (ACCUSED_OF_A_CHARGE_CHARGED_WITH)
 * Category: style
 */
export const accusedOfAChargeChargedWithRule: GrammarRule = {
  id: 'accused-of-a-charge-charged-with',
  name: 'accused of a charge (charged with)',
  description: 'This phrase may be redundant. Consider writing: charged with instead.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\baccused\b\s+\bof\b\s+\ba\b\s+\bcharge\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This phrase may be redundant. Consider writing: charged with instead.',
        suggestions: ["charged with"],
      });
    }
    
    return issues;
  },
};
