import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * lest vs last
 * 
 * Source: LanguageTool (LEST_LAST)
 * Category: grammar
 */
export const lestLastRule: GrammarRule = {
  id: 'lest-last',
  name: 'lest vs last',
  description: 'Did you mean last (= previous) or least (= superlative of \"little\")?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthe|my|your|his|their\b\s+\blest\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean last (= previous) or least (= superlative of \"little\")?',
        suggestions: ["last","least"],
      });
    }
    
    return issues;
  },
};
