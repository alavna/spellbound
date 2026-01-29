import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * No 'more' or 'most' before superlatives
 * 
 * Source: LanguageTool (MOST_SUPERLATIVE)
 * Category: grammar
 */
export const mostSuperlativeRule: GrammarRule = {
  id: 'most-superlative',
  name: 'No \'more\' or \'most\' before superlatives',
  description: 'Only \\2 (without \'\\1\') is used to write the superlative.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmo(re|st)/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Only \\2 (without \'\\1\') is used to write the superlative.',
        suggestions: ["\\2"],
      });
    }
    
    return issues;
  },
};
