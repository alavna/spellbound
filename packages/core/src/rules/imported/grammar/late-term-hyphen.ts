import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'late-term'
 * 
 * Source: LanguageTool (LATE_TERM_HYPHEN)
 * Category: grammar
 */
export const lateTermHyphenRule: GrammarRule = {
  id: 'late-term-hyphen',
  name: 'missing hyphen in \'late-term\'',
  description: 'The adjective late-term is spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\blate\b\s+\bterm\b\s+\babortions?|pregnanc(y|ies)|miscarriages?|bab(y|ies)|birth|complications?|fetals?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The adjective late-term is spelled with a hyphen.',
        suggestions: ["late-term"],
      });
    }
    
    return issues;
  },
};
