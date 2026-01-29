import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'Afro American'
 * 
 * Source: LanguageTool (AFRO_AMERICAN_HYPHEN)
 * Category: grammar
 */
export const afroAmericanHyphenRule: GrammarRule = {
  id: 'afro-american-hyphen',
  name: 'missing hyphen in \'Afro American\'',
  description: 'This expression is usually spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bafro\b\s+\bamericans?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This expression is usually spelled with a hyphen.',
        suggestions: ["-"],
      });
    }
    
    return issues;
  },
};
