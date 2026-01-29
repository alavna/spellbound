import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * as time progressed (passed)
 * 
 * Source: LanguageTool (AS_TIME_PROGRESSED)
 * Category: grammar
 */
export const asTimeProgressedRule: GrammarRule = {
  id: 'as-time-progressed',
  name: 'as time progressed (passed)',
  description: 'Did you mean as time passed?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bas\b\s+\btime\b\s+\bprogressed\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean as time passed?',
        suggestions: ["as time passed"],
      });
    }
    
    return issues;
  },
};
