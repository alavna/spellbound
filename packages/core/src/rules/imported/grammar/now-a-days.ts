import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * now a days (nowadays)
 * 
 * Source: LanguageTool (NOW_A_DAYS)
 * Category: grammar
 */
export const nowADaysRule: GrammarRule = {
  id: 'now-a-days',
  name: 'now a days (nowadays)',
  description: 'Did you mean nowadays?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bnow\b\s+\ba\b\s+\bdays\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean nowadays?',
        suggestions: ["nowadays"],
      });
    }
    
    return issues;
  },
};
