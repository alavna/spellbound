import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * majority (most, usually) when not voting
 * 
 * Source: LanguageTool (MAJORITY)
 * Category: style
 */
export const majorityRule: GrammarRule = {
  id: 'majority',
  name: 'majority (most, usually) when not voting',
  description: 'Majority in the sense of \"more than half\" is used with countable nouns only (esp. when voting); for uncountable nouns, use most or usually.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmajority\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Majority in the sense of \"more than half\" is used with countable nouns only (esp. when voting); for uncountable nouns, use most or usually.',
        suggestions: ["most","usually"],
      });
    }
    
    return issues;
  },
};
