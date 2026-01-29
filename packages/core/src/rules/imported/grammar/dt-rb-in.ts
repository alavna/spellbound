import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Adverb instead of noun
 * 
 * Source: LanguageTool (DT_RB_IN)
 * Category: grammar
 */
export const dtRbInRule: GrammarRule = {
  id: 'dt-rb-in',
  name: 'Adverb instead of noun',
  description: 'The adverb \"\\2\" cannot be used like a noun.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Tt]he|[Aa]n?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The adverb \"\\2\" cannot be used like a noun.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
