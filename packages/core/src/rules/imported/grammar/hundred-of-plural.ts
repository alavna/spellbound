import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Maybe you've read a hundred (hundreds) of books
 * 
 * Source: LanguageTool (HUNDRED_OF_PLURAL)
 * Category: grammar
 */
export const hundredOfPluralRule: GrammarRule = {
  id: 'hundred-of-plural',
  name: 'Maybe you\'ve read a hundred (hundreds) of books',
  description: 'This noun should be plural in this context.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban?\s+\bten|hundred|thousand|million|billion|trillion|quadrillion\b\s+\bof\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This noun should be plural in this context.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
