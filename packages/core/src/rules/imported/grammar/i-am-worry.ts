import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I am worry (worried)
 * 
 * Source: LanguageTool (I_AM_WORRY)
 * Category: grammar
 */
export const iAmWorryRule: GrammarRule = {
  id: 'i-am-worry',
  name: 'I am worry (worried)',
  description: 'Did you mean worried?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\byes\b\s+\bworry\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean worried?',
        suggestions: ["worried"],
      });
    }
    
    return issues;
  },
};
