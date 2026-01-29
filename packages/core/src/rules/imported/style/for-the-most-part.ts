import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * for the most part (omit)
 * 
 * Source: LanguageTool (FOR_THE_MOST_PART)
 * Category: style
 */
export const forTheMostPartRule: GrammarRule = {
  id: 'for-the-most-part',
  name: 'for the most part (omit)',
  description: 'See if you could remove this phrase.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfor\b\s+\bthe\b\s+\bmost\b\s+\bpart\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'See if you could remove this phrase.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
