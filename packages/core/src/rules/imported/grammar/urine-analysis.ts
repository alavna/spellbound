import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * urine analysis (urinalysis)
 * 
 * Source: LanguageTool (URINE_ANALYSIS)
 * Category: grammar
 */
export const urineAnalysisRule: GrammarRule = {
  id: 'urine-analysis',
  name: 'urine analysis (urinalysis)',
  description: 'Did you mean urinalysis?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\burine\b\s+\banalysis\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean urinalysis?',
        suggestions: ["urinalysis"],
      });
    }
    
    return issues;
  },
};
