import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * To whom it may concern
 * 
 * Source: LanguageTool (TO_WHO_IT_MAY_CONCERN)
 * Category: grammar
 */
export const toWhoItMayConcernRule: GrammarRule = {
  id: 'to-who-it-may-concern',
  name: 'To whom it may concern',
  description: 'Did you mean the introductory phrase to whom it may concern?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\btoo?\s+\bwhom?\s+\bi[stn]\s+\bma?y|might\b\s+\bconcerns?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the introductory phrase to whom it may concern?',
        suggestions: ["to whom it may concern"],
      });
    }
    
    return issues;
  },
};
