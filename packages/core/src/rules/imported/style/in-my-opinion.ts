import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * in my opinion (omit)
 * 
 * Source: LanguageTool (IN_MY_OPINION)
 * Category: style
 */
export const inMyOpinionRule: GrammarRule = {
  id: 'in-my-opinion',
  name: 'in my opinion (omit)',
  description: 'See if you could remove this phrase.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin\b\s+\bmy\b\s+\bopinion\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'See if you could remove this phrase.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
