import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * peak (pique) his interest
 * 
 * Source: LanguageTool (PEAK_HIS_INTEREST)
 * Category: grammar
 */
export const peakHisInterestRule: GrammarRule = {
  id: 'peak-his-interest',
  name: 'peak (pique) his interest',
  description: 'Did you mean pique \\2 \\3?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bpeak\b\s+\bhis|her\b\s+\binterest|interests\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean pique \\2 \\3?',
        suggestions: ["pique \\2 \\3"],
      });
    }
    
    return issues;
  },
};
