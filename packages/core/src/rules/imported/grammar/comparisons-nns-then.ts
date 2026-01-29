import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * comparisons NNS then (than)
 * 
 * Source: LanguageTool (COMPARISONS_NNS_THEN)
 * Category: grammar
 */
export const comparisonsNnsThenRule: GrammarRule = {
  id: 'comparisons-nns-then',
  name: 'comparisons NNS then (than)',
  description: 'Did you mean than?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhotter|colder|lamer|less|lesser|more|greater|heavier|lighter|better|worse|smarter|dumber|cheaper|sexier|taller|shorter|faster|slower|older|younger|easier|harder|farther|closer|higher|lower|larger|smaller|sooner|later|weaker|stronger|louder|quieter|darker|brighter\b\s+\bthen\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean than?',
        suggestions: ["than"],
      });
    }
    
    return issues;
  },
};
