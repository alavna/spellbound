import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * hyphens in 'chicken-and-egg'
 * 
 * Source: LanguageTool (CHICKEN_AND_EGG_HYPHEN)
 * Category: grammar
 */
export const chickenAndEggHyphenRule: GrammarRule = {
  id: 'chicken-and-egg-hyphen',
  name: 'hyphens in \'chicken-and-egg\'',
  description: 'It appears that there are hyphens missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bchicken\b\s+\band\b\s+\begg\b\s+\bproblems?|situations?|challenges?|dilemmas?|syndromes?|questions?|paradox|thing|topics?|tasks?|issues?|errors?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that there are hyphens missing.',
        suggestions: ["\\1-\\2-\\3 \\4"],
      });
    }
    
    return issues;
  },
};
