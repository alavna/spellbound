import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Wrong phrase: 'today night' (tonight)
 * 
 * Source: LanguageTool (TODAY_NIGHT)
 * Category: grammar
 */
export const todayNightRule: GrammarRule = {
  id: 'today-night',
  name: 'Wrong phrase: \'today night\' (tonight)',
  description: 'This is a non-standard collocation. Normally, tonight is used instead.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\btoday\b\s+\bnight\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This is a non-standard collocation. Normally, tonight is used instead.',
        suggestions: ["tonight"],
      });
    }
    
    return issues;
  },
};
