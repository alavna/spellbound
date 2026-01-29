import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * new comer (newcomer)
 * 
 * Source: LanguageTool (NEW_COMER)
 * Category: grammar
 */
export const newComerRule: GrammarRule = {
  id: 'new-comer',
  name: 'new comer (newcomer)',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bnew\b\s+\bcomers?/gi;
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
