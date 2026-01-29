import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * thereto (there to)
 * 
 * Source: LanguageTool (THERETO)
 * Category: grammar
 */
export const theretoRule: GrammarRule = {
  id: 'thereto',
  name: 'thereto (there to)',
  description: 'Did you mean instead of the adverb \"\\2\"?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bt?hereto\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean instead of the adverb \"\\2\"?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
