import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'push up bra'
 * 
 * Source: LanguageTool (PUSH_UP_HYPHEN)
 * Category: grammar
 */
export const pushUpHyphenRule: GrammarRule = {
  id: 'push-up-hyphen',
  name: 'missing hyphen in \'push up bra\'',
  description: 'The adjective \\1-\\2 is spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bpush\b\s+\bup\b\s+\bbras?|bikinis?/gi;
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
