import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * all of (a) sudden
 * 
 * Source: LanguageTool (ALL_OF_SUDDEN)
 * Category: grammar
 */
export const allOfSuddenRule: GrammarRule = {
  id: 'all-of-sudden',
  name: 'all of (a) sudden',
  description: 'It appears that an article is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ball\b\s+\bof\b\s+\bsudden\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that an article is missing.',
        suggestions: ["a sudden"],
      });
    }
    
    return issues;
  },
};
