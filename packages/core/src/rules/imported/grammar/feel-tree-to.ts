import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * feel tree (free) to
 * 
 * Source: LanguageTool (FEEL_TREE_TO)
 * Category: grammar
 */
export const feelTreeToRule: GrammarRule = {
  id: 'feel-tree-to',
  name: 'feel tree (free) to',
  description: 'Did you mean free?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfeel\b\s+\btree\b\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean free?',
        suggestions: ["free"],
      });
    }
    
    return issues;
  },
};
