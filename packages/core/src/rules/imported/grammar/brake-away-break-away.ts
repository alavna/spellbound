import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * brake away (break away)
 * 
 * Source: LanguageTool (BRAKE_AWAY_BREAK_AWAY)
 * Category: grammar
 */
export const brakeAwayBreakAwayRule: GrammarRule = {
  id: 'brake-away-break-away',
  name: 'brake away (break away)',
  description: 'Did you mean break away?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\baway\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean break away?',
        suggestions: ["break away"],
      });
    }
    
    return issues;
  },
};
