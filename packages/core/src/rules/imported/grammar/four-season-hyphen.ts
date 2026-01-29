import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in '4 season tent'
 * 
 * Source: LanguageTool (FOUR_SEASON_HYPHEN)
 * Category: grammar
 */
export const fourSeasonHyphenRule: GrammarRule = {
  id: 'four-season-hyphen',
  name: 'missing hyphen in \'4 season tent\'',
  description: 'When \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /4|four|all\b\s+\bseason\b\s+\bporch(es)?|rooms?|tents?|gloves?|tires?|storage|tickets?/gi;
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
