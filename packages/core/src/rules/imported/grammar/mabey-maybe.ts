import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Mabey vs. Maybe
 * 
 * Source: LanguageTool (MABEY_MAYBE)
 * Category: grammar
 */
export const mabeyMaybeRule: GrammarRule = {
  id: 'mabey-maybe',
  name: 'Mabey vs. Maybe',
  description: '\"Mabey\" is a common surname. Did you mean maybe (= perhaps)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmabey\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\"Mabey\" is a common surname. Did you mean maybe (= perhaps)?',
        suggestions: ["maybe"],
      });
    }
    
    return issues;
  },
};
