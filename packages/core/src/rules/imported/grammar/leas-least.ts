import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * leas vs least
 * 
 * Source: LanguageTool (LEAS_LEAST)
 * Category: grammar
 */
export const leasLeastRule: GrammarRule = {
  id: 'leas-least',
  name: 'leas vs least',
  description: 'Did you mean least?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Aa]t\b\s+\bleas\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean least?',
        suggestions: ["least"],
      });
    }
    
    return issues;
  },
};
