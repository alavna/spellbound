import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * hyphen in 'man made'
 * 
 * Source: LanguageTool (MAN_MADE)
 * Category: grammar
 */
export const manMadeRule: GrammarRule = {
  id: 'man-made',
  name: 'hyphen in \'man made\'',
  description: 'It appears that a hyphen is missing in this modifier.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /(wo)?man\b\s+\bmade\b\s+\bislands?|fibres?|disasters?|crisis|diamonds?|diseases?|damages?|freshwater|meadows?|earthquakes?|eggs?|elements?|forests?|fruits?|lakes?|beach(es)?|resources?|attractions?|jewels|jewelr(y|ies)|jungle|products?|nature|clouds?|honey?|hybrids?|hazards?|hurricanes?|animals?|galler(y|ies)|granite|greenhouse|materials?|monsters?|mountains?|noise?|objects?|pollution|rivers?|rain|rocks|radiation|risks?|structures?|storms?|snow|satellites?|sources?|tsunamis?|tourist|textiles?|tornados?|vegetables?|virus(es)?|waterfalls?|wood|wonders|water|zoo|events?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that a hyphen is missing in this modifier.',
        suggestions: ["-"],
      });
    }
    
    return issues;
  },
};
