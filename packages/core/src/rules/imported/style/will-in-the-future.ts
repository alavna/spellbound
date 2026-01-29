import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * will in the future (will)
 * 
 * Source: LanguageTool (WILL_IN_THE_FUTURE)
 * Category: style
 */
export const willInTheFutureRule: GrammarRule = {
  id: 'will-in-the-future',
  name: 'will in the future (will)',
  description: 'Consider using will or will eventually.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwill\b\s+\bin\b\s+\bthe\b\s+\bfuture\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using will or will eventually.',
        suggestions: ["will","will eventually"],
      });
    }
    
    return issues;
  },
};
