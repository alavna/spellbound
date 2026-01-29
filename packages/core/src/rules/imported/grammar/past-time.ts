import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * past time (pastime)
 * 
 * Source: LanguageTool (PAST_TIME)
 * Category: grammar
 */
export const pastTimeRule: GrammarRule = {
  id: 'past-time',
  name: 'past time (pastime)',
  description: 'Did you mean pastime?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bpast\b\s+\btime\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean pastime?',
        suggestions: ["pastime"],
      });
    }
    
    return issues;
  },
};
