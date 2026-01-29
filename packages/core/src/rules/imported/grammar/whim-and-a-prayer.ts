import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * whim (wing) and a prayer
 * 
 * Source: LanguageTool (WHIM_AND_A_PRAYER)
 * Category: grammar
 */
export const whimAndAPrayerRule: GrammarRule = {
  id: 'whim-and-a-prayer',
  name: 'whim (wing) and a prayer',
  description: 'Did you mean wing and a prayer?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwhim\b\s+\band\b\s+\ba\b\s+\bprayer\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean wing and a prayer?',
        suggestions: ["wing and a prayer"],
      });
    }
    
    return issues;
  },
};
