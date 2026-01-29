import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * hands free (hands-free)
 * 
 * Source: LanguageTool (HANDS_FREE_HYPHEN)
 * Category: grammar
 */
export const handsFreeHyphenRule: GrammarRule = {
  id: 'hands-free-hyphen',
  name: 'hands free (hands-free)',
  description: 'The adjective \\1-\\2 is spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhands\b\s+\bfree\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The adjective \\1-\\2 is spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
