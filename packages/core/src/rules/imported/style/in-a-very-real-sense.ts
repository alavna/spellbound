import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * in a very real sense (omit)
 * 
 * Source: LanguageTool (IN_A_VERY_REAL_SENSE)
 * Category: style
 */
export const inAVeryRealSenseRule: GrammarRule = {
  id: 'in-a-very-real-sense',
  name: 'in a very real sense (omit)',
  description: 'See if you could remove this phrase.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin\b\s+\ba\b\s+\bvery\b\s+\breal\b\s+\bsense\b/gi;
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
