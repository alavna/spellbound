import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * counter part (counterpart)
 * 
 * Source: LanguageTool (COUNTER_COMPOUNDS)
 * Category: grammar
 */
export const counterCompoundsRule: GrammarRule = {
  id: 'counter-compounds',
  name: 'counter part (counterpart)',
  description: 'This word is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcounter\b\s+\bparts?|party|parties|intuitive|feits?|feiters?|points?|protest(er)?s?|productive|proposals?|acts?|acted|acting|weights?|balances?|clockwise|tenors?|arguments?|factuals?|terroris[tm]s?|movements?|intelligence|espionage|sign(s|ed|ing)?|cyclical|offensives?|measures?|offers?|sanctions?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This word is normally spelled as one word.',
        suggestions: ["counter"],
      });
    }
    
    return issues;
  },
};
