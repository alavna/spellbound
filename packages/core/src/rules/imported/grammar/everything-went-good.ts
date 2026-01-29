import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Everything went good (well) until I checked out the competition
 * 
 * Source: LanguageTool (EVERYTHING_WENT_GOOD)
 * Category: grammar
 */
export const everythingWentGoodRule: GrammarRule = {
  id: 'everything-went-good',
  name: 'Everything went good (well) until I checked out the competition',
  description: 'The adverb \'well\' may be more appropriate in this context.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwent|checked|played|ran|read|represented|shifted|spoke|tested|worked|wrote\b\s+\bgood\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The adverb \'well\' may be more appropriate in this context.',
        suggestions: ["well"],
      });
    }
    
    return issues;
  },
};
