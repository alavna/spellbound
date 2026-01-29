import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * That guy is really one of the (a) kind
 * 
 * Source: LanguageTool (ONE_OF_THE_KIND)
 * Category: grammar
 */
export const oneOfTheKindRule: GrammarRule = {
  id: 'one-of-the-kind',
  name: 'That guy is really one of the (a) kind',
  description: 'Did you mean to say \'\\1 \\2 a \\4\'?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bof\b\s+\bthe\b\s+\bkind\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean to say \'\\1 \\2 a \\4\'?',
        suggestions: ["a"],
      });
    }
    
    return issues;
  },
};
