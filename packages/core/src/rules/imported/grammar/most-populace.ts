import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * most populace (populous)
 * 
 * Source: LanguageTool (MOST_POPULACE)
 * Category: grammar
 */
export const mostPopulaceRule: GrammarRule = {
  id: 'most-populace',
  name: 'most populace (populous)',
  description: 'Did you mean populous?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmost|least\b\s+\bpopulace\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean populous?',
        suggestions: ["populous"],
      });
    }
    
    return issues;
  },
};
