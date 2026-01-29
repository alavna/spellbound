import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * to be nothing such as (to be no such thing as)
 * 
 * Source: LanguageTool (NOTHING_SUCH_AS)
 * Category: grammar
 */
export const nothingSuchAsRule: GrammarRule = {
  id: 'nothing-such-as',
  name: 'to be nothing such as (to be no such thing as)',
  description: 'Did you mean \\1 no such thing as?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bnothing\b\s+\bsuch\b\s+\bas\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1 no such thing as?',
        suggestions: ["\\1 no such thing as"],
      });
    }
    
    return issues;
  },
};
