import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 360 (180) degree change
 * 
 * Source: LanguageTool (DEGREE_CHANGE)
 * Category: grammar
 */
export const degreeChangeRule: GrammarRule = {
  id: 'degree-change',
  name: '360 (180) degree change',
  description: 'Did you mean ? (360 degrees leads to the starting point)',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /360(-degree)?\s+\bchange|turn\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean ? (360 degrees leads to the starting point)',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
