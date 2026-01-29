import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Replace 'currently' with a specific date
 * 
 * Source: LanguageTool (WIKIPEDIA_CURRENTLY)
 * Category: style
 */
export const wikipediaCurrentlyRule: GrammarRule = {
  id: 'wikipedia-currently',
  name: 'Replace \'currently\' with a specific date',
  description: 'Wikipedia style. Replace \"currently\" with a specific date, as \"currently\" will change over time.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcurrently\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Wikipedia style. Replace \"currently\" with a specific date, as \"currently\" will change over time.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
