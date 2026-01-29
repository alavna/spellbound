import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * now-a-day (nowadays)
 * 
 * Source: LanguageTool (NOW_A_DAY_HYPHEN)
 * Category: grammar
 */
export const nowADayHyphenRule: GrammarRule = {
  id: 'now-a-day-hyphen',
  name: 'now-a-day (nowadays)',
  description: 'Did you mean nowadays?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bnow-a-day\b/gi;
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
