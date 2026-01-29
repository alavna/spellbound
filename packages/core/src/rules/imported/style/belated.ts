import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * belated (late)
 * 
 * Source: LanguageTool (BELATED)
 * Category: style
 */
export const belatedRule: GrammarRule = {
  id: 'belated',
  name: 'belated (late)',
  description: 'Outdated. Did you mean late?',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbelated\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Outdated. Did you mean late?',
        suggestions: ["late"],
      });
    }
    
    return issues;
  },
};
