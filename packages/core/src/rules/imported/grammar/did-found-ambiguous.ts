import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Auxiliary verb + ambiguous past tense
 * 
 * Source: LanguageTool (DID_FOUND_AMBIGUOUS)
 * Category: grammar
 */
export const didFoundAmbiguousRule: GrammarRule = {
  id: 'did-found-ambiguous',
  name: 'Auxiliary verb + ambiguous past tense',
  description: 'Make sure that the ambiguous verb form \'\\3\' is correct. (It can either be the base form \'\\3\', or the past tense of a different verb.)',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdid|will|could|can|should|would|does|ll|shall|cannot|might|may\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Make sure that the ambiguous verb form \'\\3\' is correct. (It can either be the base form \'\\3\', or the past tense of a different verb.)',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
