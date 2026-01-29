import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * combine together (combine)
 * 
 * Source: LanguageTool (COMBINE_TOGETHER)
 * Category: style
 */
export const combineTogetherRule: GrammarRule = {
  id: 'combine-together',
  name: 'combine together (combine)',
  description: '\' \' is redundant. Use',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\btogether\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\' \' is redundant. Use',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
