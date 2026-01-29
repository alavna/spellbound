import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * a know (known) bug/problem
 * 
 * Source: LanguageTool (A_KNOW_BUG)
 * Category: grammar
 */
export const aKnowBugRule: GrammarRule = {
  id: 'a-know-bug',
  name: 'a know (known) bug/problem',
  description: 'Did you mean known?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ba\b\s+\bknow\b\s+\bbug|problem\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean known?',
        suggestions: ["known"],
      });
    }
    
    return issues;
  },
};
