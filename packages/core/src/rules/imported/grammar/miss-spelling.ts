import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * miss spelling (misspelling)
 * 
 * Source: LanguageTool (MISS_SPELLING)
 * Category: grammar
 */
export const missSpellingRule: GrammarRule = {
  id: 'miss-spelling',
  name: 'miss spelling (misspelling)',
  description: 'Did you mean the noun mis (= incorrectly spelled word)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmiss?\s+\bspellings?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the noun mis (= incorrectly spelled word)?',
        suggestions: ["mis"],
      });
    }
    
    return issues;
  },
};
