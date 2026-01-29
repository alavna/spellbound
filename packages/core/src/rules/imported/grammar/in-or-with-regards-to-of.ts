import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * in/with regards to/of (regarding, with regard to)
 * 
 * Source: LanguageTool (IN_OR_WITH_REGARDS_TO_OF)
 * Category: grammar
 */
export const inOrWithRegardsToOfRule: GrammarRule = {
  id: 'in-or-with-regards-to-of',
  name: 'in/with regards to/of (regarding, with regard to)',
  description: 'Although \"\\1 \\2 \\3\" is sometimes used in casual speech, it is typically considered a nonstandard phrase.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin|with\b\s+\bregards\b\s+\bto|of\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Although \"\\1 \\2 \\3\" is sometimes used in casual speech, it is typically considered a nonstandard phrase.',
        suggestions: ["in regard to","with regard to","regarding"],
      });
    }
    
    return issues;
  },
};
