import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * taken back (aback) by
 * 
 * Source: LanguageTool (BACK_ABACK)
 * Category: grammar
 */
export const backAbackRule: GrammarRule = {
  id: 'back-aback',
  name: 'taken back (aback) by',
  description: 'Did you mean \'taken aback\' (=surprised or shocked)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\btaken\b\s+\bbl?a(ck|g)\s+\bby\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \'taken aback\' (=surprised or shocked)?',
        suggestions: ["aback"],
      });
    }
    
    return issues;
  },
};
