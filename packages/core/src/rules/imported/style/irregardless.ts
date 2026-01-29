import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * irregardless (regardless)
 * 
 * Source: LanguageTool (IRREGARDLESS)
 * Category: style
 */
export const irregardlessRule: GrammarRule = {
  id: 'irregardless',
  name: 'irregardless (regardless)',
  description: '\'Irregardless\' is nonstandard. In formal style you should use regardless.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\birregardless\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\'Irregardless\' is nonstandard. In formal style you should use regardless.',
        suggestions: ["regardless"],
      });
    }
    
    return issues;
  },
};
