import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * even handed (even-handed)
 * 
 * Source: LanguageTool (EVEN_HANDED_HYPHEN)
 * Category: grammar
 */
export const evenHandedHyphenRule: GrammarRule = {
  id: 'even-handed-hyphen',
  name: 'even handed (even-handed)',
  description: 'This word is normally spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\beven\b\s+\bhanded(ly)?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This word is normally spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
