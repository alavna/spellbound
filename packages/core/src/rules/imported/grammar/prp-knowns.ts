import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * he knowns (knows)
 * 
 * Source: LanguageTool (PRP_KNOWNS)
 * Category: grammar
 */
export const prpKnownsRule: GrammarRule = {
  id: 'prp-knowns',
  name: 'he knowns (knows)',
  description: 'Did you mean knows (= \'to know\')?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bs?he|it\b\s+\S+\s+\bknowns\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean knows (= \'to know\')?',
        suggestions: ["knows"],
      });
    }
    
    return issues;
  },
};
