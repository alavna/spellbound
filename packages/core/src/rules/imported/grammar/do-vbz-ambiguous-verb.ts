import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * do you found (find)
 * 
 * Source: LanguageTool (DO_VBZ_AMBIGUOUS_VERB)
 * Category: grammar
 */
export const doVbzAmbiguousVerbRule: GrammarRule = {
  id: 'do-vbz-ambiguous-verb',
  name: 'do you found (find)',
  description: 'Make sure that the ambiguous verb form \'\\5\' is correct. (It can either be the base form \'\\5\', or the past tense of a different verb.)',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bDo(es)?|did\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Make sure that the ambiguous verb form \'\\5\' is correct. (It can either be the base form \'\\5\', or the past tense of a different verb.)',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
