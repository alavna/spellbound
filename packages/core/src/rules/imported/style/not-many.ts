import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * not many (few)
 * 
 * Source: LanguageTool (NOT_MANY)
 * Category: style
 */
export const notManyRule: GrammarRule = {
  id: 'not-many',
  name: 'not many (few)',
  description: 'Avoid using \"not\". Did you mean few?',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bnot\b\s+\bmany\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Avoid using \"not\". Did you mean few?',
        suggestions: ["few"],
      });
    }
    
    return issues;
  },
};
