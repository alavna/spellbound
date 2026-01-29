import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in '7 figure salary'
 * 
 * Source: LanguageTool (FIGURE_HYPHEN)
 * Category: grammar
 */
export const figureHyphenRule: GrammarRule = {
  id: 'figure-hyphen',
  name: 'missing hyphen in \'7 figure salary\'',
  description: 'When \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bfigure\b\s+\S+\s+\bsalar(ies|y)|jobs?|business|revenues?|sum|developer|compensation|income|earner|number|profits?|deals?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'When \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
