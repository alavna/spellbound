import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Hyphen in 'click through rate'
 * 
 * Source: LanguageTool (CLICK_THROUGH_RATE)
 * Category: grammar
 */
export const clickThroughRateRule: GrammarRule = {
  id: 'click-through-rate',
  name: 'Hyphen in \'click through rate\'',
  description: 'It appears that a hyphen is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bview|click\b\s+\bthrough\b\s+\bconversions?|rates?|optimi[sz]ations?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that a hyphen is missing.',
        suggestions: ["\\1-\\2 \\3"],
      });
    }
    
    return issues;
  },
};
