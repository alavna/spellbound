import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * is contained of (contains)
 * 
 * Source: LanguageTool (IS_CONTAINED_OF)
 * Category: grammar
 */
export const isContainedOfRule: GrammarRule = {
  id: 'is-contained-of',
  name: 'is contained of (contains)',
  description: 'Did you mean contains?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bis\b\s+\bcontained\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean contains?',
        suggestions: ["contains"],
      });
    }
    
    return issues;
  },
};
