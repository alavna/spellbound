import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Carnegie Mellon
 * 
 * Source: LanguageTool (CARNEGIE_MELLON)
 * Category: grammar
 */
export const carnegieMellonRule: GrammarRule = {
  id: 'carnegie-mellon',
  name: 'Carnegie Mellon',
  description: 'Did you mean the university Carnegie Mellon?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bCarn[ie]g(y|ie)\s+\bMell?[eo]n\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the university Carnegie Mellon?',
        suggestions: ["Carnegie Mellon"],
      });
    }
    
    return issues;
  },
};
