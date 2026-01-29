import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I em (am)
 * 
 * Source: LanguageTool (I_EM)
 * Category: grammar
 */
export const iEmRule: GrammarRule = {
  id: 'i-em',
  name: 'I em (am)',
  description: 'Did you mean I am?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bI\b\s+\bem\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean I am?',
        suggestions: ["I am"],
      });
    }
    
    return issues;
  },
};
