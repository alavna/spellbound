import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Confusion of mars/Mars
 * 
 * Source: LanguageTool (CONFUSION_OF_MARS_MARS)
 * Category: grammar
 */
export const confusionOfMarsMarsRule: GrammarRule = {
  id: 'confusion-of-mars-mars',
  name: 'Confusion of mars/Mars',
  description: 'The planet, chocolate brand and the god are written with uppercase. \'\\2\' refers to the verb \'mar\' meaning to spoil, or the plural of the noun \'mar\' meaning blemishes.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmars\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The planet, chocolate brand and the god are written with uppercase. \'\\2\' refers to the verb \'mar\' meaning to spoil, or the plural of the noun \'mar\' meaning blemishes.',
        suggestions: ["Mars"],
      });
    }
    
    return issues;
  },
};
