import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * curator on/of
 * 
 * Source: LanguageTool (CURATOR_OF)
 * Category: grammar
 */
export const curatorOfRule: GrammarRule = {
  id: 'curator-of',
  name: 'curator on/of',
  description: 'The usual collocation for \"curator\" is \"of\", not \"\\2\". Did you mean \\1 of \\3 \\4?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcurators\.\s+\bon\b\s+\bthe\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The usual collocation for \"curator\" is \"of\", not \"\\2\". Did you mean \\1 of \\3 \\4?',
        suggestions: ["\\1 of \\3 \\4"],
      });
    }
    
    return issues;
  },
};
