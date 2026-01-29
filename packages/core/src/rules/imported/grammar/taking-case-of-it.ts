import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * take case (care) of it
 * 
 * Source: LanguageTool (TAKING_CASE_OF_IT)
 * Category: grammar
 */
export const takingCaseOfItRule: GrammarRule = {
  id: 'taking-case-of-it',
  name: 'take case (care) of it',
  description: 'Did you mean care?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bcase\b\s+\bof\b\s+\bit|the|an?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean care?',
        suggestions: ["care"],
      });
    }
    
    return issues;
  },
};
