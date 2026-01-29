import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * decision making (decision-making)
 * 
 * Source: LanguageTool (DECISION_MAKING)
 * Category: grammar
 */
export const decisionMakingRule: GrammarRule = {
  id: 'decision-making',
  name: 'decision making (decision-making)',
  description: 'The noun \\1-\\2 (= the process of deciding something) is spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdecision\b\s+\bmaking\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun \\1-\\2 (= the process of deciding something) is spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
