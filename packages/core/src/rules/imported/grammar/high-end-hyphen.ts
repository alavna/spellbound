import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'high end'
 * 
 * Source: LanguageTool (HIGH_END_HYPHEN)
 * Category: grammar
 */
export const highEndHyphenRule: GrammarRule = {
  id: 'high-end-hyphen',
  name: 'missing hyphen in \'high end\'',
  description: 'Did you mean the adjective high-end (spelled with a hyphen)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhigh|low\b\s+\bend\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the adjective high-end (spelled with a hyphen)?',
        suggestions: ["high-end"],
      });
    }
    
    return issues;
  },
};
