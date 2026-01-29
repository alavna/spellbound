import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * the hot-dog (hot dog)
 * 
 * Source: LanguageTool (THE_HOT_DOG)
 * Category: grammar
 */
export const theHotDogRule: GrammarRule = {
  id: 'the-hot-dog',
  name: 'the hot-dog (hot dog)',
  description: 'The word \"\\2\" spelled with a hyphen is a verb. Did you mean the noun ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthe|an?|my|y?our|his|their\b\s+\S+\s+\blip-syncs?|hot-dogs?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word \"\\2\" spelled with a hyphen is a verb. Did you mean the noun ?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
