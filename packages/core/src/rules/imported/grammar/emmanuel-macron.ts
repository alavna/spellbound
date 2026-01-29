import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Emmanuel Macron
 * 
 * Source: LanguageTool (EMMANUEL_MACRON)
 * Category: grammar
 */
export const emmanuelMacronRule: GrammarRule = {
  id: 'emmanuel-macron',
  name: 'Emmanuel Macron',
  description: 'Did you mean Emmanuel Macron (= politician)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bE?mm?anue?ll?e?\s+\bMacrone?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean Emmanuel Macron (= politician)?',
        suggestions: ["Emmanuel Macron"],
      });
    }
    
    return issues;
  },
};
