import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * one of the only (few)
 * 
 * Source: LanguageTool (ONE_OF_THE_ONLY)
 * Category: grammar
 */
export const oneOfTheOnlyRule: GrammarRule = {
  id: 'one-of-the-only',
  name: 'one of the only (few)',
  description: 'Some people suggest that the phrase is idiomatic or illogical and that a better option is one of the few.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bone\b\s+\bof\b\s+\bthe\b\s+\bonly\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Some people suggest that the phrase is idiomatic or illogical and that a better option is one of the few.',
        suggestions: ["one of the few"],
      });
    }
    
    return issues;
  },
};
