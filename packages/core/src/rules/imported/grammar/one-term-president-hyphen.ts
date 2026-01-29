import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'one term president'
 * 
 * Source: LanguageTool (ONE_TERM_PRESIDENT_HYPHEN)
 * Category: grammar
 */
export const oneTermPresidentHyphenRule: GrammarRule = {
  id: 'one-term-president-hyphen',
  name: 'missing hyphen in \'one term president\'',
  description: 'This noun is normally spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bone\b\s+\bterm\b\s+\bpresidents?|polynomials?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This noun is normally spelled with a hyphen.',
        suggestions: ["\\1-\\2 \\3"],
      });
    }
    
    return issues;
  },
};
