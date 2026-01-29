import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * a la (à la)
 * 
 * Source: LanguageTool (A_LA_DIACRITIC)
 * Category: grammar
 */
export const aLaDiacriticRule: GrammarRule = {
  id: 'a-la-diacritic',
  name: 'a la (à la)',
  description: '‘A la’ is a foreign expression which originally has a diacritic.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ba\b\s+\bla\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '‘A la’ is a foreign expression which originally has a diacritic.',
        suggestions: ["à la"],
      });
    }
    
    return issues;
  },
};
