import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * not longer -> no longer
 * 
 * Source: LanguageTool (NOT_LONGER)
 * Category: grammar
 */
export const notLongerRule: GrammarRule = {
  id: 'not-longer',
  name: 'not longer -> no longer',
  description: 'Did you mean the adverb no longer?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bnot\b\s+\blonger\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the adverb no longer?',
        suggestions: ["no longer"],
      });
    }
    
    return issues;
  },
};
