import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * all things considered (omit)
 * 
 * Source: LanguageTool (ALL_THINGS_CONSIDERED)
 * Category: style
 */
export const allThingsConsideredRule: GrammarRule = {
  id: 'all-things-considered',
  name: 'all things considered (omit)',
  description: 'Remove as unnecessary.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ball\b\s+\bthings\b\s+\bconsidered\b\s+,/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Remove as unnecessary.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
