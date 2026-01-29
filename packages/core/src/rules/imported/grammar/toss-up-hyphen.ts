import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'toss up'
 * 
 * Source: LanguageTool (TOSS_UP_HYPHEN)
 * Category: grammar
 */
export const tossUpHyphenRule: GrammarRule = {
  id: 'toss-up-hyphen',
  name: 'missing hyphen in \'toss up\'',
  description: 'The noun or adjective \\1-\\2 is spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\btoss\b\s+\bup\b\s+\bstates?|votes?|senate\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun or adjective \\1-\\2 is spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
