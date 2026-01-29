import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'two factor auth'
 * 
 * Source: LanguageTool (FACTOR_HYPHEN)
 * Category: grammar
 */
export const factorHyphenRule: GrammarRule = {
  id: 'factor-hyphen',
  name: 'missing hyphen in \'two factor auth\'',
  description: 'When \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /1|2|3|one|two|three|multi\b\s+\bfactor\b\s+\bauth|authentications?|authori[sz]ations?|theory|graph|models?|app|pcc|logins?|accounts?|theorem|codes?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'When \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
