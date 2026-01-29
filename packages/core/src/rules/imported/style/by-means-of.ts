import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * by means of (by, with, through)
 * 
 * Source: LanguageTool (BY_MEANS_OF)
 * Category: style
 */
export const byMeansOfRule: GrammarRule = {
  id: 'by-means-of',
  name: 'by means of (by, with, through)',
  description: 'Did you mean by, with or through?',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bby\b\s+\bmeans\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean by, with or through?',
        suggestions: ["by","with","through"],
      });
    }
    
    return issues;
  },
};
