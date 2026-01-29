import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * area 51 (Area 51)
 * 
 * Source: LanguageTool (AREA_51)
 * Category: grammar
 */
export const area51Rule: GrammarRule = {
  id: 'area-51',
  name: 'area 51 (Area 51)',
  description: 'The word \'\\1 \\2\' is a proper noun and needs to be capitalized.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\barea\b\s+51/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word \'\\1 \\2\' is a proper noun and needs to be capitalized.',
        suggestions: ["Area 51"],
      });
    }
    
    return issues;
  },
};
