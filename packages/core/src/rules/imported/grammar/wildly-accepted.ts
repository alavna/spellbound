import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * wildly (widely) accepted
 * 
 * Source: LanguageTool (WILDLY_ACCEPTED)
 * Category: grammar
 */
export const wildlyAcceptedRule: GrammarRule = {
  id: 'wildly-accepted',
  name: 'wildly (widely) accepted',
  description: 'Did you mean widely?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwildly\b\s+\baccepted\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean widely?',
        suggestions: ["widely"],
      });
    }
    
    return issues;
  },
};
