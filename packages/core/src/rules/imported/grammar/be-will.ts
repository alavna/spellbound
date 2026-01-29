import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * will follows be ('he is would')
 * 
 * Source: LanguageTool (BE_WILL)
 * Category: grammar
 */
export const beWillRule: GrammarRule = {
  id: 'be-will',
  name: 'will follows be (\'he is would\')',
  description: 'One of these words may be redundant.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'One of these words may be redundant.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
