import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Mary (Merry) Christmas
 * 
 * Source: LanguageTool (MARY_CHRISTMAS)
 * Category: grammar
 */
export const maryChristmasRule: GrammarRule = {
  id: 'mary-christmas',
  name: 'Mary (Merry) Christmas',
  description: 'Did you mean the Christmas greeting merry Christmas?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmarr?y\b\s+\bchristmas|krist?mas\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the Christmas greeting merry Christmas?',
        suggestions: ["merry Christmas"],
      });
    }
    
    return issues;
  },
};
