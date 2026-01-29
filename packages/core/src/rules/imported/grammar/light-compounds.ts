import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * day light (daylight)
 * 
 * Source: LanguageTool (LIGHT_COMPOUNDS)
 * Category: grammar
 */
export const lightCompoundsRule: GrammarRule = {
  id: 'light-compounds',
  name: 'day light (daylight)',
  description: 'This word is usually spelled as one word: .',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bday|flash|spot|sun|gas|candle|star|sky|lime|flood|earth|torch|head\b\s+\blights?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This word is usually spelled as one word: .',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
