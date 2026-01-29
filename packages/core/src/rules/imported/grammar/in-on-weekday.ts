import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * in (on) weekdays
 * 
 * Source: LanguageTool (IN_ON_WEEKDAY)
 * Category: grammar
 */
export const inOnWeekdayRule: GrammarRule = {
  id: 'in-on-weekday',
  name: 'in (on) weekdays',
  description: 'Did you mean On?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bIn\b\s+&weekdays;\s+,|afternoon|morning|night\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean On?',
        suggestions: ["On"],
      });
    }
    
    return issues;
  },
};
