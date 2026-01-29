import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing comma in 'buy two get one free'
 * 
 * Source: LanguageTool (BUY_TWO_GET_ONE_FREE)
 * Category: grammar
 */
export const buyTwoGetOneFreeRule: GrammarRule = {
  id: 'buy-two-get-one-free',
  name: 'missing comma in \'buy two get one free\'',
  description: 'It appears that a comma is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbuy|purchase|order\b\s+\S+\s+\bget|receive\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that a comma is missing.',
        suggestions: ["\\1 \\2, \\3 \\4"],
      });
    }
    
    return issues;
  },
};
