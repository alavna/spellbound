import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * nail on the hat (head)
 * 
 * Source: LanguageTool (NAIL_ON_THE_HEAD)
 * Category: grammar
 */
export const nailOnTheHeadRule: GrammarRule = {
  id: 'nail-on-the-head',
  name: 'nail on the hat (head)',
  description: 'Did you mean head?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bnail\b\s+\bon\b\s+\bthe\b\s+\bh[ia][td]/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean head?',
        suggestions: ["head"],
      });
    }
    
    return issues;
  },
};
