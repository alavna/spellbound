import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * famous celebrity (celebrity)
 * 
 * Source: LanguageTool (FAMOUS_CELEBRITY)
 * Category: style
 */
export const famousCelebrityRule: GrammarRule = {
  id: 'famous-celebrity',
  name: 'famous celebrity (celebrity)',
  description: 'Consider using \\2.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfamous\b\s+\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using \\2.',
        suggestions: ["\\2"],
      });
    }
    
    return issues;
  },
};
