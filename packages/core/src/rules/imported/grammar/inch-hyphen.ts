import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in '22 inch monitor'
 * 
 * Source: LanguageTool (INCH_HYPHEN)
 * Category: grammar
 */
export const inchHyphenRule: GrammarRule = {
  id: 'inch-hyphen',
  name: 'missing hyphen in \'22 inch monitor\'',
  description: 'When \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\binch\b\s+\bmonitors?|waists?|screens?|macbooks?|nails?|guns?|holes?|ipads?|drives?|tablets?|systems?|satellite|galaxy|laptops?|tvs?|projectors?|softballs?|tires?|bikes?|bicycles?|bmx|dishwashers?|rims?|wheels?|dell|samsung|hd|floppy|disks?|binders?|mac|heels|cakes?|subway|grinders?|cables?|records?|tft|led|howitzer|table|dildos?/gi;
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
