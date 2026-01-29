import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * private industry (industry)
 * 
 * Source: LanguageTool (PRIVATE_INDUSTRY)
 * Category: style
 */
export const privateIndustryRule: GrammarRule = {
  id: 'private-industry',
  name: 'private industry (industry)',
  description: 'This phrase is redundant. Consider using \\2.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bprivate\b\s+\bindustr\.\.:y\.ies\./gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This phrase is redundant. Consider using \\2.',
        suggestions: ["\\2"],
      });
    }
    
    return issues;
  },
};
