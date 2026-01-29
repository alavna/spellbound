import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Wrong collocation: 'worry for' (worry about)
 * 
 * Source: LanguageTool (WORRY_FOR)
 * Category: grammar
 */
export const worryForRule: GrammarRule = {
  id: 'worry-for',
  name: 'Wrong collocation: \'worry for\' (worry about)',
  description: 'The verb \'worry\' does not normally take the preposition \'for\'. Did you mean \\1 about?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bfor\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The verb \'worry\' does not normally take the preposition \'for\'. Did you mean \\1 about?',
        suggestions: ["\\1 about"],
      });
    }
    
    return issues;
  },
};
