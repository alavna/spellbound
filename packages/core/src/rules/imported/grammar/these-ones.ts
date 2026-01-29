import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * these/those ones (these/those)
 * 
 * Source: LanguageTool (THESE_ONES)
 * Category: grammar
 */
export const theseOnesRule: GrammarRule = {
  id: 'these-ones',
  name: 'these/those ones (these/those)',
  description: 'In formal contexts, \\1 is sufficient.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bth[eo]se\b\s+\bones\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'In formal contexts, \\1 is sufficient.',
        suggestions: ["\\1"],
      });
    }
    
    return issues;
  },
};
