import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * one(-)trick pony
 * 
 * Source: LanguageTool (ONE_TRICK_HYPHEN)
 * Category: grammar
 */
export const oneTrickHyphenRule: GrammarRule = {
  id: 'one-trick-hyphen',
  name: 'one(-)trick pony',
  description: 'It appears that a hyphen is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bone\b\s+\btrick\b\s+\bpon(y|ies)|wonder\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that a hyphen is missing.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
