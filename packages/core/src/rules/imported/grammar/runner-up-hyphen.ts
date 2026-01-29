import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * runnner-up
 * 
 * Source: LanguageTool (RUNNER_UP_HYPHEN)
 * Category: grammar
 */
export const runnerUpHyphenRule: GrammarRule = {
  id: 'runner-up-hyphen',
  name: 'runnner-up',
  description: 'The noun \\1-\\2 (= didn\'t finish first place) is spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\brunners?|knees\b\s+\bup\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun \\1-\\2 (= didn\'t finish first place) is spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
