import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * hardly never (ever)
 * 
 * Source: LanguageTool (HARDLY_NEVER)
 * Category: grammar
 */
export const hardlyNeverRule: GrammarRule = {
  id: 'hardly-never',
  name: 'hardly never (ever)',
  description: 'Did you mean hardly ever?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhardly\b\s+\bnever\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean hardly ever?',
        suggestions: ["hardly ever"],
      });
    }
    
    return issues;
  },
};
