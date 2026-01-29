import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 'Do to that fact that' → 'Due to'
 * 
 * Source: LanguageTool (DO_TO_THE_FACT_THAT)
 * Category: grammar
 */
export const doToTheFactThatRule: GrammarRule = {
  id: 'do-to-the-fact-that',
  name: '\'Do to that fact that\' → \'Due to\'',
  description: 'Use due to or because of to fix spelling and readability of this sentence.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdo\b\s+\bto\b\s+\bthe\b\s+\bfact\b\s+\bthat\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Use due to or because of to fix spelling and readability of this sentence.',
        suggestions: ["due to","because of"],
      });
    }
    
    return issues;
  },
};
