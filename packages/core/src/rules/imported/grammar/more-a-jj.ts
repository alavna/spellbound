import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Word order: 'more a ...' instead of 'a more ...'
 * 
 * Source: LanguageTool (MORE_A_JJ)
 * Category: grammar
 */
export const moreAJjRule: GrammarRule = {
  id: 'more-a-jj',
  name: 'Word order: \'more a ...\' instead of \'a more ...\'',
  description: 'Did you mean a more \\3?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban?\s+\bdetailed\b\s+\bdescription\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean a more \\3?',
        suggestions: ["a more \\3"],
      });
    }
    
    return issues;
  },
};
