import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * some of the (some)
 * 
 * Source: LanguageTool (SOME_OF_THE)
 * Category: style
 */
export const someOfTheRule: GrammarRule = {
  id: 'some-of-the',
  name: 'some of the (some)',
  description: 'If the text is a generality, \'\\3 \\4\' is not necessary.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /(?!\bor\b)\S+\s+\bsome\b\s+\bof\b\s+\bthe\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'If the text is a generality, \'\\3 \\4\' is not necessary.',
        suggestions: ["\\2"],
      });
    }
    
    return issues;
  },
};
