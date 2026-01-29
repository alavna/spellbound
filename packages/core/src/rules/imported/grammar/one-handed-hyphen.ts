import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * one handed (one-handed)
 * 
 * Source: LanguageTool (ONE_HANDED_HYPHEN)
 * Category: grammar
 */
export const oneHandedHyphenRule: GrammarRule = {
  id: 'one-handed-hyphen',
  name: 'one handed (one-handed)',
  description: 'The adjective or adverb \\1-\\2 is spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bone|two\b\s+\bhanded\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The adjective or adverb \\1-\\2 is spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
