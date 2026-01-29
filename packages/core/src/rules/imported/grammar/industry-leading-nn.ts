import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * industry leading (industry-leading)
 * 
 * Source: LanguageTool (INDUSTRY_LEADING_NN)
 * Category: grammar
 */
export const industryLeadingNnRule: GrammarRule = {
  id: 'industry-leading-nn',
  name: 'industry leading (industry-leading)',
  description: 'Did you mean \\2-\\3?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bindustry\b\s+\bleading\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\2-\\3?',
        suggestions: ["\\2-\\3"],
      });
    }
    
    return issues;
  },
};
