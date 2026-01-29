import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * is even worst (worse)
 * 
 * Source: LanguageTool (IS_EVEN_WORST)
 * Category: grammar
 */
export const isEvenWorstRule: GrammarRule = {
  id: 'is-even-worst',
  name: 'is even worst (worse)',
  description: 'Probably incorrect use of superlative \'\\3\'. Consider using the comparative form instead.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bis|w(?:as|ere)\s+\beven\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Probably incorrect use of superlative \'\\3\'. Consider using the comparative form instead.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
