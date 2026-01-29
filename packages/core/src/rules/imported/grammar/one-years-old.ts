import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * one years (year) old
 * 
 * Source: LanguageTool (ONE_YEARS_OLD)
 * Category: grammar
 */
export const oneYearsOldRule: GrammarRule = {
  id: 'one-years-old',
  name: 'one years (year) old',
  description: '\"\\1\" requires a singular noun.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /1|one\b\s+(milli)?seconds|minutes|hours|days|weeks|months|years\b\s+\bold(er)?|young(er)?|before|after|since|prior|until|till\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\"\\1\" requires a singular noun.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
