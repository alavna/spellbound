import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in '2 door coupe'
 * 
 * Source: LanguageTool (DOOR_HYPHEN)
 * Category: grammar
 */
export const doorHyphenRule: GrammarRule = {
  id: 'door-hyphen',
  name: 'missing hyphen in \'2 door coupe\'',
  description: 'When \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /2|3|4|5|6|7|8|two|three|four|five|six|seven|eight\b\s+\bdoor\b\s+\bcoup[eé]s?|cars?|vans?|jeeps?|sports|honda|toyota|sedans?|mustang|porsche|camaro|refrigerators?|convertibles?|suv|hatchbacks?|pickups?|trucks?|wardrobes?|ford|bmw|benz|mercedes|audi|vw|tesla|challenger\b/gi;
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
