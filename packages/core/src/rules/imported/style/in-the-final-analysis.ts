import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * in the final or last or ultimate analysis (finally, in conclusion)
 * 
 * Source: LanguageTool (IN_THE_FINAL_ANALYSIS)
 * Category: style
 */
export const inTheFinalAnalysisRule: GrammarRule = {
  id: 'in-the-final-analysis',
  name: 'in the final or last or ultimate analysis (finally, in conclusion)',
  description: 'Did you mean finally or in conclusion? You could remove the phase, too.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin\b\s+\bthe\b\s+\bfinal|last|ultimate\b\s+\banalysis\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean finally or in conclusion? You could remove the phase, too.',
        suggestions: ["finally","in conclusion"],
      });
    }
    
    return issues;
  },
};
