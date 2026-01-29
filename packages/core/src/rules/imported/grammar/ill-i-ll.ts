import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Ill (I'll)
 * 
 * Source: LanguageTool (ILL_I_LL)
 * Category: grammar
 */
export const illILlRule: GrammarRule = {
  id: 'ill-i-ll',
  name: 'Ill (I\'ll)',
  description: 'Did you mean I\'ll?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean I\'ll?',
        suggestions: ["I'll"],
      });
    }
    
    return issues;
  },
};
