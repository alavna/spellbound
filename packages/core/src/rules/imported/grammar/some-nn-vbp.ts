import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 'some' + sing. noun + verb
 * 
 * Source: LanguageTool (SOME_NN_VBP)
 * Category: grammar
 */
export const someNnVbpRule: GrammarRule = {
  id: 'some-nn-vbp',
  name: '\'some\' + sing. noun + verb',
  description: 'It appears that the noun or verb are incorrect.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsome\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that the noun or verb are incorrect.',
        suggestions: ["\\3","\\2"],
      });
    }
    
    return issues;
  },
};
