import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing pronoun after 'where/when/how/why'
 * 
 * Source: LanguageTool (WHERE_MD_VB)
 * Category: grammar
 */
export const whereMdVbRule: GrammarRule = {
  id: 'where-md-vb',
  name: 'missing pronoun after \'where/when/how/why\'',
  description: 'It appears that a pronoun is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwhere|when|how|why\b\s+\S+\s+\S+\s+[.!\.]/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that a pronoun is missing.',
        suggestions: ["\\4 it","\\4 you","\\4 I","\\4 we"],
      });
    }
    
    return issues;
  },
};
