import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * analysis if (of)
 * 
 * Source: LanguageTool (ANALYSIS_IF)
 * Category: grammar
 */
export const analysisIfRule: GrammarRule = {
  id: 'analysis-if',
  name: 'analysis if (of)',
  description: 'Did you mean of?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\banalysis|kind\b\s+\bif\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean of?',
        suggestions: ["of"],
      });
    }
    
    return issues;
  },
};
