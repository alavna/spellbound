import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'easy going'
 * 
 * Source: LanguageTool (EASY_GOING_HYPHEN)
 * Category: grammar
 */
export const easyGoingHyphenRule: GrammarRule = {
  id: 'easy-going-hyphen',
  name: 'missing hyphen in \'easy going\'',
  description: 'The adjective \\3-\\4 is spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthe|an?\s+\S+\s+\beasy\b\s+\bgoing\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The adjective \\3-\\4 is spelled with a hyphen.',
        suggestions: ["\\3-\\4"],
      });
    }
    
    return issues;
  },
};
