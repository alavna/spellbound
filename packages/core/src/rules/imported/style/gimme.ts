import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * gimme (give me)
 * 
 * Source: LanguageTool (GIMME)
 * Category: style
 */
export const gimmeRule: GrammarRule = {
  id: 'gimme',
  name: 'gimme (give me)',
  description: 'The word \"\\1\" is informal.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bgimmi?e\b\s+\bmy|y?our|his|her|its|their|the|an?|this|that|th[eo]se|many|much|any|some|more|less|what|back|(any|some)(thing|one)|dat|dis\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word \"\\1\" is informal.',
        suggestions: ["give me"],
      });
    }
    
    return issues;
  },
};
