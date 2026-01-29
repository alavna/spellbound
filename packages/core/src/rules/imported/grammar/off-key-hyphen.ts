import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'off key'
 * 
 * Source: LanguageTool (OFF_KEY_HYPHEN)
 * Category: grammar
 */
export const offKeyHyphenRule: GrammarRule = {
  id: 'off-key-hyphen',
  name: 'missing hyphen in \'off key\'',
  description: 'The adjective or adverb \\1-\\2 (= out of tune) is spelled with a hyphen',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\boff\b\s+\bkey\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The adjective or adverb \\1-\\2 (= out of tune) is spelled with a hyphen',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
