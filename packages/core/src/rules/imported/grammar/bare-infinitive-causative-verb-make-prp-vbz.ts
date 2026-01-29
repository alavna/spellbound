import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * makes me goes → makes me go
 * 
 * Source: LanguageTool (BARE_INFINITIVE_CAUSATIVE_VERB_MAKE_PRP_VBZ)
 * Category: grammar
 */
export const bareInfinitiveCausativeVerbMakePrpVbzRule: GrammarRule = {
  id: 'bare-infinitive-causative-verb-make-prp-vbz',
  name: 'makes me goes → makes me go',
  description: 'The causative verb \'\\1\' and the object \'\\2\' should be followed by the bare infinitive .',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bme|you|him|her|it|them|us\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The causative verb \'\\1\' and the object \'\\2\' should be followed by the bare infinitive .',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
