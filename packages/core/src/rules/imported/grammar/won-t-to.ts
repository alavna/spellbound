import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I won't (want) to be
 * 
 * Source: LanguageTool (WON_T_TO)
 * Category: grammar
 */
export const wonTToRule: GrammarRule = {
  id: 'won-t-to',
  name: 'I won\'t (want) to be',
  description: 'The modal verb \"will\" can\'t be used with \"to\". Did you mean want?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwo\b\s+\bn't\b\s+\bto\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The modal verb \"will\" can\'t be used with \"to\". Did you mean want?',
        suggestions: ["want"],
      });
    }
    
    return issues;
  },
};
