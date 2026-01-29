import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * not the same (different)
 * 
 * Source: LanguageTool (NOT_THE_SAME)
 * Category: style
 */
export const notTheSameRule: GrammarRule = {
  id: 'not-the-same',
  name: 'not the same (different)',
  description: 'Avoid using \"not\". Did you mean different?',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bnot\b\s+\bthe\b\s+\bsame\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Avoid using \"not\". Did you mean different?',
        suggestions: ["different"],
      });
    }
    
    return issues;
  },
};
