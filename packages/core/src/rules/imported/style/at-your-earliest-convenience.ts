import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * at your earliest convenience (as soon as you can)
 * 
 * Source: LanguageTool (AT_YOUR_EARLIEST_CONVENIENCE)
 * Category: style
 */
export const atYourEarliestConvenienceRule: GrammarRule = {
  id: 'at-your-earliest-convenience',
  name: 'at your earliest convenience (as soon as you can)',
  description: 'Overly formal. Did you mean as soon as you can?',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bat\b\s+\byour\b\s+\bearliest\b\s+\bconvenience\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Overly formal. Did you mean as soon as you can?',
        suggestions: ["as soon as you can"],
      });
    }
    
    return issues;
  },
};
