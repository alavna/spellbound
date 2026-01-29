import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * a was (way)
 * 
 * Source: LanguageTool (A_WAS)
 * Category: grammar
 */
export const aWasRule: GrammarRule = {
  id: 'a-was',
  name: 'a was (way)',
  description: 'Did you mean way?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ba\b\s+\bwas\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean way?',
        suggestions: ["way"],
      });
    }
    
    return issues;
  },
};
