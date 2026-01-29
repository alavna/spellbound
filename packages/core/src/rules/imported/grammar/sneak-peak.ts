import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * sneak peak (sneak peek)
 * 
 * Source: LanguageTool (SNEAK_PEAK)
 * Category: grammar
 */
export const sneakPeakRule: GrammarRule = {
  id: 'sneak-peak',
  name: 'sneak peak (sneak peek)',
  description: 'Did you mean \\1 peek (=preview)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsneak\b\s+\bpeak\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1 peek (=preview)?',
        suggestions: ["\\1 peek"],
      });
    }
    
    return issues;
  },
};
