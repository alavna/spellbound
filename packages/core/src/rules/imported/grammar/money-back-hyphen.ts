import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'money back guarantee'
 * 
 * Source: LanguageTool (MONEY_BACK_HYPHEN)
 * Category: grammar
 */
export const moneyBackHyphenRule: GrammarRule = {
  id: 'money-back-hyphen',
  name: 'missing hyphen in \'money back guarantee\'',
  description: 'In this phrase \"money-back\" is an adjective and needs to be spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmoney\b\s+\bback\b\s+\bguarantees?|polic(y|ies)|warrant(y|ies)|deals?|offers?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'In this phrase \"money-back\" is an adjective and needs to be spelled with a hyphen.',
        suggestions: ["\\1-\\2 \\3"],
      });
    }
    
    return issues;
  },
};
