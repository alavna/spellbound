import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * sea food (seafood)
 * 
 * Source: LanguageTool (SEA_COMPOUNDS)
 * Category: grammar
 */
export const seaCompoundsRule: GrammarRule = {
  id: 'sea-compounds',
  name: 'sea food (seafood)',
  description: 'This word is normally spelled as one.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsea\b\s+\bbirds?|bags?|foods?|crafts?|farers?|gulls?|grass|horses?|planes?|ports?|water\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This word is normally spelled as one.',
        suggestions: ["sea"],
      });
    }
    
    return issues;
  },
};
