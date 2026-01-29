import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * one ore (or)
 * 
 * Source: LanguageTool (ONE_ORE)
 * Category: grammar
 */
export const oneOreRule: GrammarRule = {
  id: 'one-ore',
  name: 'one ore (or)',
  description: 'Did you mean or?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bore\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean or?',
        suggestions: ["or"],
      });
    }
    
    return issues;
  },
};
