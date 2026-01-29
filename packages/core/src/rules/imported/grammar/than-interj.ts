import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * ..., than, ... (then)
 * 
 * Source: LanguageTool (THAN_INTERJ)
 * Category: grammar
 */
export const thanInterjRule: GrammarRule = {
  id: 'than-interj',
  name: '..., than, ... (then)',
  description: 'Did you mean then?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /,\s+\bthan\b\s+,/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean then?',
        suggestions: ["then"],
      });
    }
    
    return issues;
  },
};
