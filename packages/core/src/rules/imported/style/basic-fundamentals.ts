import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * basic fundamentals/necessities (fundamentals/necessities)
 * 
 * Source: LanguageTool (BASIC_FUNDAMENTALS)
 * Category: style
 */
export const basicFundamentalsRule: GrammarRule = {
  id: 'basic-fundamentals',
  name: 'basic fundamentals/necessities (fundamentals/necessities)',
  description: 'Consider using \\2.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfundamentals|necessities\b/gi;
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
