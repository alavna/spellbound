import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * any where (anywhere)
 * 
 * Source: LanguageTool (ANY_WHERE)
 * Category: grammar
 */
export const anyWhereRule: GrammarRule = {
  id: 'any-where',
  name: 'any where (anywhere)',
  description: 'Did you mean anywhere?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bany\b\s+\bwhere\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean anywhere?',
        suggestions: ["anywhere"],
      });
    }
    
    return issues;
  },
};
