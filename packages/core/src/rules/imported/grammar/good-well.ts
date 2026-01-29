import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * good (well)
 * 
 * Source: LanguageTool (GOOD_WELL)
 * Category: grammar
 */
export const goodWellRule: GrammarRule = {
  id: 'good-well',
  name: 'good (well)',
  description: 'Did you mean the adverb well?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+&languages;\s+\bgood\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the adverb well?',
        suggestions: ["well"],
      });
    }
    
    return issues;
  },
};
