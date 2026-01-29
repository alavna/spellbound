import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * obtain (get)
 * 
 * Source: LanguageTool (OBTAIN)
 * Category: style
 */
export const obtainRule: GrammarRule = {
  id: 'obtain',
  name: 'obtain (get)',
  description: 'Did you mean simpler get?',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean simpler get?',
        suggestions: ["get"],
      });
    }
    
    return issues;
  },
};
