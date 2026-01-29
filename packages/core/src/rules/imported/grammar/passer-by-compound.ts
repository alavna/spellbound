import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * passer by (passer-by)
 * 
 * Source: LanguageTool (PASSER_BY_COMPOUND)
 * Category: grammar
 */
export const passerByCompoundRule: GrammarRule = {
  id: 'passer-by-compound',
  name: 'passer by (passer-by)',
  description: 'The noun \\1-by is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Pp]assers?\s+\bby\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun \\1-by is spelled as one word.',
        suggestions: ["\\1-by"],
      });
    }
    
    return issues;
  },
};
