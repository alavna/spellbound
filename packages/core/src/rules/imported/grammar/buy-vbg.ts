import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * buy (by) + gerund verb
 * 
 * Source: LanguageTool (BUY_VBG)
 * Category: grammar
 */
export const buyVbgRule: GrammarRule = {
  id: 'buy-vbg',
  name: 'buy (by) + gerund verb',
  description: 'Did you mean by?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbuy\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean by?',
        suggestions: ["by"],
      });
    }
    
    return issues;
  },
};
