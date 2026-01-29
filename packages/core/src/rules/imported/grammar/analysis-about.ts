import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Collocation: analysis about/of
 * 
 * Source: LanguageTool (ANALYSIS_ABOUT)
 * Category: grammar
 */
export const analysisAboutRule: GrammarRule = {
  id: 'analysis-about',
  name: 'Collocation: analysis about/of',
  description: 'The usual collocation for \"analysis\" is \"of\".',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\banalysis\b\s+\babout\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The usual collocation for \"analysis\" is \"of\".',
        suggestions: ["analysis of"],
      });
    }
    
    return issues;
  },
};
