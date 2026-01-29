import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * hears vs years
 * 
 * Source: LanguageTool (HEARS_YEARS)
 * Category: grammar
 */
export const hearsYearsRule: GrammarRule = {
  id: 'hears-years',
  name: 'hears vs years',
  description: 'Did you mean years?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhears\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean years?',
        suggestions: ["years"],
      });
    }
    
    return issues;
  },
};
