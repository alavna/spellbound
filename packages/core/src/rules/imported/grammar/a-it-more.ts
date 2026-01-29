import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * a it (bit) more
 * 
 * Source: LanguageTool (A_IT_MORE)
 * Category: grammar
 */
export const aItMoreRule: GrammarRule = {
  id: 'a-it-more',
  name: 'a it (bit) more',
  description: 'Did you mean bit?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthe|an?\s+\bit\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean bit?',
        suggestions: ["bit"],
      });
    }
    
    return issues;
  },
};
