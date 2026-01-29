import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * in term (terms) of
 * 
 * Source: LanguageTool (IN_TERM_OF_PHRASE)
 * Category: grammar
 */
export const inTermOfPhraseRule: GrammarRule = {
  id: 'in-term-of-phrase',
  name: 'in term (terms) of',
  description: 'Did you mean the commonly used phrase \\1 \\2s \\3?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin\b\s+\bterms?\s+\boff?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the commonly used phrase \\1 \\2s \\3?',
        suggestions: ["\\1 \\2s \\3"],
      });
    }
    
    return issues;
  },
};
