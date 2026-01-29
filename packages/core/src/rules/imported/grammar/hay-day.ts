import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * hay day (heyday)
 * 
 * Source: LanguageTool (HAY_DAY)
 * Category: grammar
 */
export const hayDayRule: GrammarRule = {
  id: 'hay-day',
  name: 'hay day (heyday)',
  description: 'Did you mean heyday?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bh[ae]y\b\s+\bday\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean heyday?',
        suggestions: ["heyday"],
      });
    }
    
    return issues;
  },
};
