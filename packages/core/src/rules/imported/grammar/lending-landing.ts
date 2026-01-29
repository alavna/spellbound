import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * lending vs. landing
 * 
 * Source: LanguageTool (LENDING_LANDING)
 * Category: grammar
 */
export const lendingLandingRule: GrammarRule = {
  id: 'lending-landing',
  name: 'lending vs. landing',
  description: 'Did you mean landing \\2?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\blending\b\s+\bpages?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean landing \\2?',
        suggestions: ["landing \\2"],
      });
    }
    
    return issues;
  },
};
