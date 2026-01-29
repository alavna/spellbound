import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * you are requested (please)
 * 
 * Source: LanguageTool (YOU_ARE_REQUESTED)
 * Category: style
 */
export const youAreRequestedRule: GrammarRule = {
  id: 'you-are-requested',
  name: 'you are requested (please)',
  description: 'Replace with please',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byou\b\s+\bare\b\s+\brequested\b\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Replace with please',
        suggestions: ["please"],
      });
    }
    
    return issues;
  },
};
