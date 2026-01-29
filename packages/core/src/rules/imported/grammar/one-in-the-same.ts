import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * one in the same (one and the same)
 * 
 * Source: LanguageTool (ONE_IN_THE_SAME)
 * Category: grammar
 */
export const oneInTheSameRule: GrammarRule = {
  id: 'one-in-the-same',
  name: 'one in the same (one and the same)',
  description: 'Did you mean one and the same?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bone\b\s+\bin\b\s+\bthe\b\s+\bsame\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean one and the same?',
        suggestions: ["one and the same"],
      });
    }
    
    return issues;
  },
};
