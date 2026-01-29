import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * In a hastily way
 * 
 * Source: LanguageTool (A_HASTILY_WAY)
 * Category: grammar
 */
export const aHastilyWayRule: GrammarRule = {
  id: 'a-hastily-way',
  name: 'In a hastily way',
  description: 'Did you mean hasty \\4?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\S+\s+\bhastily\b\s+\bway|manner|decisions?|temperments?|pudding\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean hasty \\4?',
        suggestions: ["hasty \\4"],
      });
    }
    
    return issues;
  },
};
