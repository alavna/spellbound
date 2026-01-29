import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * because of the fact that (because)
 * 
 * Source: LanguageTool (BECAUSE_OF_THE_FACT_THAT)
 * Category: style
 */
export const becauseOfTheFactThatRule: GrammarRule = {
  id: 'because-of-the-fact-that',
  name: 'because of the fact that (because)',
  description: 'This phrase is redundant. Consider using because.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbecause\b\s+\bof\b\s+\bthe\b\s+\bfact\b\s+\bthat\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This phrase is redundant. Consider using because.',
        suggestions: ["because"],
      });
    }
    
    return issues;
  },
};
