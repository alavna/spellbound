import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * through (throw) away
 * 
 * Source: LanguageTool (THROUGH_AWAY)
 * Category: grammar
 */
export const throughAwayRule: GrammarRule = {
  id: 'through-away',
  name: 'through (throw) away',
  description: 'Did you mean throw?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthrough\b\s+\baway\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean throw?',
        suggestions: ["throw"],
      });
    }
    
    return issues;
  },
};
