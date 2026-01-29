import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * A week long (week-long) vacation
 * 
 * Source: LanguageTool (WEEK_LONG_HYPHEN)
 * Category: grammar
 */
export const weekLongHyphenRule: GrammarRule = {
  id: 'week-long-hyphen',
  name: 'A week long (week-long) vacation',
  description: 'It appears that a hyphen is missing in the adjective \\3-\\4.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban?|the|this|th[oe]se|my|y?our|their|his|her|s|of\b\s+\bhour|day|week|month|year\b\s+\blong|old\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that a hyphen is missing in the adjective \\3-\\4.',
        suggestions: ["\\3-\\4"],
      });
    }
    
    return issues;
  },
};
