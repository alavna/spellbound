import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * insure that (ensure that)
 * 
 * Source: LanguageTool (INSURE_THAT)
 * Category: grammar
 */
export const insureThatRule: GrammarRule = {
  id: 'insure-that',
  name: 'insure that (ensure that)',
  description: 'Did you mean ensure (=make sure)? \'Insure\' means \'pay money to insurance company\'.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\binsure\b\s+\bthat\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean ensure (=make sure)? \'Insure\' means \'pay money to insurance company\'.',
        suggestions: ["ensure"],
      });
    }
    
    return issues;
  },
};
