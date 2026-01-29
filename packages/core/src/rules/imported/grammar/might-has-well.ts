import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * might has (as) well
 * 
 * Source: LanguageTool (MIGHT_HAS_WELL)
 * Category: grammar
 */
export const mightHasWellRule: GrammarRule = {
  id: 'might-has-well',
  name: 'might has (as) well',
  description: 'Did you mean might as well?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmight\b\s+\bhas\b\s+\bwell\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean might as well?',
        suggestions: ["might as well"],
      });
    }
    
    return issues;
  },
};
