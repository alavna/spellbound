import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Big in size, yellow in color, etc.
 * 
 * Source: LanguageTool (ADJECTIVE_IN_ATTRIBUTE)
 * Category: style
 */
export const adjectiveInAttributeRule: GrammarRule = {
  id: 'adjective-in-attribute',
  name: 'Big in size, yellow in color, etc.',
  description: 'This wording could be more concise.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin\b\s+\bsize|duration|colou?r|number|shape|length|[hw]eight\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This wording could be more concise.',
        suggestions: ["\\1"],
      });
    }
    
    return issues;
  },
};
