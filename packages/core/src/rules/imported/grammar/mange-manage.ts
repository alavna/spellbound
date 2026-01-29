import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * mange vs manage
 * 
 * Source: LanguageTool (MANGE_MANAGE)
 * Category: grammar
 */
export const mangeManageRule: GrammarRule = {
  id: 'mange-manage',
  name: 'mange vs manage',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\S+\s+[Mm]anges?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean ?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
