import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * not never
 * 
 * Source: LanguageTool (NOT_NEVER)
 * Category: grammar
 */
export const notNeverRule: GrammarRule = {
  id: 'not-never',
  name: 'not never',
  description: '\"Not\" and \"never\" have a similar meaning. Please check if one can be removed.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bnever\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\"Not\" and \"never\" have a similar meaning. Please check if one can be removed.',
        suggestions: ["\\1","\\2"],
      });
    }
    
    return issues;
  },
};
