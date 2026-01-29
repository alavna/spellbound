import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * see him goes → see him go
 * 
 * Source: LanguageTool (BARE_INFINITIVE_VERB_OF_PERCEPTION_SEE_PRP_VBZ)
 * Category: grammar
 */
export const bareInfinitiveVerbOfPerceptionSeePrpVbzRule: GrammarRule = {
  id: 'bare-infinitive-verb-of-perception-see-prp-vbz',
  name: 'see him goes → see him go',
  description: 'The verb of perception \'\\1\' and the object \'\\2\' should be followed by the bare infinitive .',
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
        message: 'The verb of perception \'\\1\' and the object \'\\2\' should be followed by the bare infinitive .',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
