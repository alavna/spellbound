import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Collocation: at the weekend
 * 
 * Source: LanguageTool (AT_THE_WEEKEND)
 * Category: grammar
 */
export const atTheWeekendRule: GrammarRule = {
  id: 'at-the-weekend',
  name: 'Collocation: at the weekend',
  description: 'The phrase \'\\1 \\2 \\3\' is a British English expression.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bat\b\s+\bthe\b\s+\bweekend\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The phrase \'\\1 \\2 \\3\' is a British English expression.',
        suggestions: ["on \\2 \\3","over \\2 \\3"],
      });
    }
    
    return issues;
  },
};
