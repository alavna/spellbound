import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * duck (duct) tape
 * 
 * Source: LanguageTool (DUCK_DUCT)
 * Category: grammar
 */
export const duckDuctRule: GrammarRule = {
  id: 'duck-duct',
  name: 'duck (duct) tape',
  description: 'Did you mean duct?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bduck\b\s+\btape\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean duct?',
        suggestions: ["duct"],
      });
    }
    
    return issues;
  },
};
