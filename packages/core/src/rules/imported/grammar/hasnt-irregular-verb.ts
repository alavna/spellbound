import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 'hasn't' + irregular past tense verb
 * 
 * Source: LanguageTool (HASNT_IRREGULAR_VERB)
 * Category: grammar
 */
export const hasntIrregularVerbRule: GrammarRule = {
  id: 'hasnt-irregular-verb',
  name: '\'hasn\'t\' + irregular past tense verb',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhas|were|had|have\b\s+\bn't\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean ?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
