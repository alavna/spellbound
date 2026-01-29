import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * prostrate (prostate)
 * 
 * Source: LanguageTool (PROSTRATE_PROSTATE)
 * Category: grammar
 */
export const prostrateProstateRule: GrammarRule = {
  id: 'prostrate-prostate',
  name: 'prostrate (prostate)',
  description: 'Did you mean prostate?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bprostrate\b\s+\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean prostate?',
        suggestions: ["prostate"],
      });
    }
    
    return issues;
  },
};
