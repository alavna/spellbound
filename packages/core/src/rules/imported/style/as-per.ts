import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * as per (as, in accordance with) 
 * 
 * Source: LanguageTool (AS_PER)
 * Category: style
 */
export const asPerRule: GrammarRule = {
  id: 'as-per',
  name: 'as per (as, in accordance with) ',
  description: 'Business jargon meaning in accordance with. Replace with as or modify the sentence.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bas\b\s+\bper\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Business jargon meaning in accordance with. Replace with as or modify the sentence.',
        suggestions: ["in accordance with","as"],
      });
    }
    
    return issues;
  },
};
