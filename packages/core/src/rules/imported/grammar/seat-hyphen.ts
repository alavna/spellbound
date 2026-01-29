import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in '2 seat convertible'
 * 
 * Source: LanguageTool (SEAT_HYPHEN)
 * Category: grammar
 */
export const seatHyphenRule: GrammarRule = {
  id: 'seat-hyphen',
  name: 'missing hyphen in \'2 seat convertible\'',
  description: 'When \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bseat\b\s+\bsofas?|sofa\.?beds?|cars?|(mini-?)?bus(es)?|suvs?|pick-?ups?|convertibles?|utvs?|tiguan|ford|vw|toyotas?|rovers?|teslas?|model|bmw|audi|nissan|jaguar|mercedes|vehicles?|tables?|(mini-?)?vans?|strollers?|quad|helicopters?|dodge|alhambra|mini|ferrari|golf|suburban|limos?|airplanes?|cessnas?|travellers?/gi;
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
