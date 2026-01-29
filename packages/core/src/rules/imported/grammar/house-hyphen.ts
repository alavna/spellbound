import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in '2 family house'
 * 
 * Source: LanguageTool (HOUSE_HYPHEN)
 * Category: grammar
 */
export const houseHyphenRule: GrammarRule = {
  id: 'house-hyphen',
  name: 'missing hyphen in \'2 family house\'',
  description: 'When \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[1-8]|one|two|three|four|five|six|seven|eight\b\s+\bfamily|person\b\s+\bhouse|mansion|apartment|trailer\b/gi;
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
