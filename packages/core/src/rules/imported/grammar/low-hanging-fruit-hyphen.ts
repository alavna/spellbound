import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'low hanging fruit'
 * 
 * Source: LanguageTool (LOW_HANGING_FRUIT_HYPHEN)
 * Category: grammar
 */
export const lowHangingFruitHyphenRule: GrammarRule = {
  id: 'low-hanging-fruit-hyphen',
  name: 'missing hyphen in \'low hanging fruit\'',
  description: 'When \\1-\\2 is used as a modifier, it is usually spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\blow\b\s+\bhanging\b\s+\bfruits?|ways?|solutions?|aproach(es)?|ideas?|clouds?|wires?|cables?|fogs?|opportunit(y|ies)|branch(es)?|limbs?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'When \\1-\\2 is used as a modifier, it is usually spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
