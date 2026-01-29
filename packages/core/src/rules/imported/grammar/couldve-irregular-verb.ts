import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 'Could've' + irregular past tense verb
 * 
 * Source: LanguageTool (COULDVE_IRREGULAR_VERB)
 * Category: grammar
 */
export const couldveIrregularVerbRule: GrammarRule = {
  id: 'couldve-irregular-verb',
  name: '\'Could\'ve\' + irregular past tense verb',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcould|would|should|you|i|we|they\b\s+'ve\b/gi;
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
