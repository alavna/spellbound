import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * every where (everywhere)
 * 
 * Source: LanguageTool (EVERY_WHERE)
 * Category: grammar
 */
export const everyWhereRule: GrammarRule = {
  id: 'every-where',
  name: 'every where (everywhere)',
  description: 'Did you mean everywhere?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bevery\b\s+\bwhere\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean everywhere?',
        suggestions: ["everywhere"],
      });
    }
    
    return issues;
  },
};
