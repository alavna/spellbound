import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * profit warning
 * 
 * Source: LanguageTool (PROFITS_WARNINGS)
 * Category: grammar
 */
export const profitsWarningsRule: GrammarRule = {
  id: 'profits-warnings',
  name: 'profit warning',
  description: 'The correct term is profit \\4.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban?|the|this|these|many|some\b\s+\bprofits\b\s+\bwarnings?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The correct term is profit \\4.',
        suggestions: ["profit \\4"],
      });
    }
    
    return issues;
  },
};
