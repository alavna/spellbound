import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * a small number of (a few)
 * 
 * Source: LanguageTool (SMALL_NUMBER_OF)
 * Category: style
 */
export const smallNumberOfRule: GrammarRule = {
  id: 'small-number-of',
  name: 'a small number of (a few)',
  description: 'Specify a number, remove phrase, use a few, or use some',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ba\b\s+\bsmall\b\s+\bnumber\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Specify a number, remove phrase, use a few, or use some',
        suggestions: ["a few","some"],
      });
    }
    
    return issues;
  },
};
