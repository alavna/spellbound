import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * where (were)
 * 
 * Source: LanguageTool (THEY_WHERE)
 * Category: grammar
 */
export const theyWhereRule: GrammarRule = {
  id: 'they-where',
  name: 'where (were)',
  description: 'Did you mean were, the simple past of \"to be\"?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthe\.y\.re\.\.we\b\s+\bwhere\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean were, the simple past of \"to be\"?',
        suggestions: ["were"],
      });
    }
    
    return issues;
  },
};
