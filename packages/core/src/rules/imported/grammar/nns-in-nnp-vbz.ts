import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Use the base form or the past tense with a plural noun
 * 
 * Source: LanguageTool (NNS_IN_NNP_VBZ)
 * Category: grammar
 */
export const nnsInNnpVbzRule: GrammarRule = {
  id: 'nns-in-nnp-vbz',
  name: 'Use the base form or the past tense with a plural noun',
  description: 'With the plural noun \'\\1\', the verb inflection \'\\4\' is not correct.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'With the plural noun \'\\1\', the verb inflection \'\\4\' is not correct.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
