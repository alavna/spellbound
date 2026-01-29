import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * if need (needed)
 * 
 * Source: LanguageTool (IF_VB_PCT)
 * Category: grammar
 */
export const ifVbPctRule: GrammarRule = {
  id: 'if-vb-pct',
  name: 'if need (needed)',
  description: 'The conjunction \"\\1\" requires the past participle . Or did you mean you \\2?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Ii]f|[Ww]hen\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The conjunction \"\\1\" requires the past participle . Or did you mean you \\2?',
        suggestions: ["you \\2"],
      });
    }
    
    return issues;
  },
};
