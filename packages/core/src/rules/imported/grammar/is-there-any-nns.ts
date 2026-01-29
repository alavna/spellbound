import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Is (are) there any chances
 * 
 * Source: LanguageTool (IS_THERE_ANY_NNS)
 * Category: grammar
 */
export const isThereAnyNnsRule: GrammarRule = {
  id: 'is-there-any-nns',
  name: 'Is (are) there any chances',
  description: 'Did you mean are?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\S+\s+\bis\b\s+\bthere\b\s+\bany|some\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean are?',
        suggestions: ["are"],
      });
    }
    
    return issues;
  },
};
