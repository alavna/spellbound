import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * open at (to) page 6
 * 
 * Source: LanguageTool (OPEN_TO_PAGE)
 * Category: grammar
 */
export const openToPageRule: GrammarRule = {
  id: 'open-to-page',
  name: 'open at (to) page 6',
  description: 'Did you mean to?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\S+\s+\bbook(s)?\s+\bpage(s)?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean to?',
        suggestions: ["to"],
      });
    }
    
    return issues;
  },
};
