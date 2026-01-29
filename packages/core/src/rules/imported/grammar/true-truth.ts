import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * true vs truth
 * 
 * Source: LanguageTool (TRUE_TRUTH)
 * Category: grammar
 */
export const trueTruthRule: GrammarRule = {
  id: 'true-truth',
  name: 'true vs truth',
  description: 'Did you mean the noun truth?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthe\b\s+\S+\s+\btrue\b\s+:|\.|\.|\.|isn?|wasn?|ha[ds]n?|doesn?|didn?|makes|made|[cw]ouldn?|shouldn?|can(not)?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the noun truth?',
        suggestions: ["truth"],
      });
    }
    
    return issues;
  },
};
