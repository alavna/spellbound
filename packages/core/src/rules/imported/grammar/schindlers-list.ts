import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Schindler's List
 * 
 * Source: LanguageTool (SCHINDLERS_LIST)
 * Category: grammar
 */
export const schindlersListRule: GrammarRule = {
  id: 'schindlers-list',
  name: 'Schindler\'s List',
  description: 'It appears that a possessive apostrophe is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bSchindlers?\s+\blist\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that a possessive apostrophe is missing.',
        suggestions: ["Schindler's \\3"],
      });
    }
    
    return issues;
  },
};
