import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * worthwhile is weak
 * 
 * Source: LanguageTool (WORTHWHILE)
 * Category: style
 */
export const worthwhileRule: GrammarRule = {
  id: 'worthwhile',
  name: 'worthwhile is weak',
  description: 'Weak word. Use something stronger like valuable.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bworthwhile\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Weak word. Use something stronger like valuable.',
        suggestions: ["valuable"],
      });
    }
    
    return issues;
  },
};
