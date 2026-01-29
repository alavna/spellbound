import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * hast o (has to)
 * 
 * Source: LanguageTool (HAST_O)
 * Category: grammar
 */
export const hastORule: GrammarRule = {
  id: 'hast-o',
  name: 'hast o (has to)',
  description: 'Did you mean has to?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhast\b\s+\bo\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean has to?',
        suggestions: ["has to"],
      });
    }
    
    return issues;
  },
};
