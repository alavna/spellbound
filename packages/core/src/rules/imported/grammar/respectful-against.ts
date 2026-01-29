import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Respectful against/toward
 * 
 * Source: LanguageTool (RESPECTFUL_AGAINST)
 * Category: grammar
 */
export const respectfulAgainstRule: GrammarRule = {
  id: 'respectful-against',
  name: 'Respectful against/toward',
  description: 'The usual collocation for \"\\1\" is \"toward\" but never \"\\2\". Did you mean \\1 toward?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /(?:dis)?respectful\b\s+\bagainst\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The usual collocation for \"\\1\" is \"toward\" but never \"\\2\". Did you mean \\1 toward?',
        suggestions: ["\\1 toward"],
      });
    }
    
    return issues;
  },
};
