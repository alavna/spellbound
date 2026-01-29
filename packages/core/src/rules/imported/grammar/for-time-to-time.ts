import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * for time to time (from time to time)
 * 
 * Source: LanguageTool (FOR_TIME_TO_TIME)
 * Category: grammar
 */
export const forTimeToTimeRule: GrammarRule = {
  id: 'for-time-to-time',
  name: 'for time to time (from time to time)',
  description: 'Non-standard phrase. Did you mean from \\2 \\3 \\4?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bform?\s+\btime\b\s+\bto\b\s+\btime\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Non-standard phrase. Did you mean from \\2 \\3 \\4?',
        suggestions: ["from \\2 \\3 \\4"],
      });
    }
    
    return issues;
  },
};
