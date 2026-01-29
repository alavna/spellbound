import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * et al (at all)
 * 
 * Source: LanguageTool (NO_PROBLEM_ET_AL)
 * Category: grammar
 */
export const noProblemEtAlRule: GrammarRule = {
  id: 'no-problem-et-al',
  name: 'et al (at all)',
  description: 'Did you mean at all?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bno\b\s+\S+\s+\S+\s+[ae]t\b\s+\ball?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean at all?',
        suggestions: ["at all"],
      });
    }
    
    return issues;
  },
};
