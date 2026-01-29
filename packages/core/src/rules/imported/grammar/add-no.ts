import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * add-no (add-on)
 * 
 * Source: LanguageTool (ADD_NO)
 * Category: grammar
 */
export const addNoRule: GrammarRule = {
  id: 'add-no',
  name: 'add-no (add-on)',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\badd-nos?/gi;
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
