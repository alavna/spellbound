import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing apostrophe in 'Childrens Day'
 * 
 * Source: LanguageTool (CHILDRENS_DAY_APOSTROPHE)
 * Category: grammar
 */
export const childrensDayApostropheRule: GrammarRule = {
  id: 'childrens-day-apostrophe',
  name: 'missing apostrophe in \'Childrens Day\'',
  description: 'It appears that a possessive apostrophe is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bChildrens\b\s+\bDay\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that a possessive apostrophe is missing.',
        suggestions: ["\\2"],
      });
    }
    
    return issues;
  },
};
