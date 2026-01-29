import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * be interesting (interested) in
 * 
 * Source: LanguageTool (BE_INTEREST_IN)
 * Category: grammar
 */
export const beInterestInRule: GrammarRule = {
  id: 'be-interest-in',
  name: 'be interesting (interested) in',
  description: 'Did you mean interested?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbe\b\s+\bin\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean interested?',
        suggestions: ["interested"],
      });
    }
    
    return issues;
  },
};
