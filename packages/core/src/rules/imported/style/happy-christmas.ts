import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Happy (Merry) Christmas
 * 
 * Source: LanguageTool (HAPPY_CHRISTMAS)
 * Category: style
 */
export const happyChristmasRule: GrammarRule = {
  id: 'happy-christmas',
  name: 'Happy (Merry) Christmas',
  description: 'It\'s more common to wish someone Merry Christmas.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhappy\b\s+\bchristmas\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It\'s more common to wish someone Merry Christmas.',
        suggestions: ["Merry Christmas"],
      });
    }
    
    return issues;
  },
};
