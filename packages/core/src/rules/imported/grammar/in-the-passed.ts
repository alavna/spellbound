import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * in the passed (in the past)
 * 
 * Source: LanguageTool (IN_THE_PASSED)
 * Category: grammar
 */
export const inThePassedRule: GrammarRule = {
  id: 'in-the-passed',
  name: 'in the passed (in the past)',
  description: 'Did you mean in the past?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin\b\s+\bthe\b\s+\bpassed\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean in the past?',
        suggestions: ["in the past"],
      });
    }
    
    return issues;
  },
};
