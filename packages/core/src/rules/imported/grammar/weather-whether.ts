import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * weather (whether)
 * 
 * Source: LanguageTool (WEATHER_WHETHER)
 * Category: grammar
 */
export const weatherWhetherRule: GrammarRule = {
  id: 'weather-whether',
  name: 'weather (whether)',
  description: 'Did you mean whether?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bweather\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean whether?',
        suggestions: ["whether"],
      });
    }
    
    return issues;
  },
};
