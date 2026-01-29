import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * going on vacation
 * 
 * Source: LanguageTool (GOING_TO_VACATION)
 * Category: grammar
 */
export const goingToVacationRule: GrammarRule = {
  id: 'going-to-vacation',
  name: 'going on vacation',
  description: 'The usual collocation for \"\\3\" is \"on\".',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bto\b\s+\bvacation|holiday\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The usual collocation for \"\\3\" is \"on\".',
        suggestions: ["\\1 on \\3"],
      });
    }
    
    return issues;
  },
};
