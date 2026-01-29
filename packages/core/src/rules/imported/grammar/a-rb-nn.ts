import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Adverb instead of an adjective
 * 
 * Source: LanguageTool (A_RB_NN)
 * Category: grammar
 */
export const aRbNnRule: GrammarRule = {
  id: 'a-rb-nn',
  name: 'Adverb instead of an adjective',
  description: 'You used an adverb (\'\\2\') instead of an adjective, or a noun (\'\\3\') instead of another adjective.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: false, // DISABLED: Broken import - pattern lost during conversion

  check(context: GrammarRuleContext) {
    const pattern = /\ban?|the\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'You used an adverb (\'\\2\') instead of an adjective, or a noun (\'\\3\') instead of another adjective.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
