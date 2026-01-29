import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Delta Air Lines
 * 
 * Source: LanguageTool (DELTA_AIRLINES)
 * Category: grammar
 */
export const deltaAirlinesRule: GrammarRule = {
  id: 'delta-airlines',
  name: 'Delta Air Lines',
  description: 'The name of this airline is Delta Air Lines (\"air\" and \"lines\" spelled as separate words).',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bDelta\b\s+\bAirlines?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The name of this airline is Delta Air Lines (\"air\" and \"lines\" spelled as separate words).',
        suggestions: ["Delta Air Lines"],
      });
    }
    
    return issues;
  },
};
