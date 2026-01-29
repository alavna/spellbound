import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * currently
 * 
 * Source: LanguageTool (CURRENTLY)
 * Category: style
 */
export const currentlyRule: GrammarRule = {
  id: 'currently',
  name: 'currently',
  description: 'Omit or replace with now',
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
        message: 'Omit or replace with now',
        suggestions: ["now"],
      });
    }
    
    return issues;
  },
};
