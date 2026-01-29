import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * how does this changes (change)
 * 
 * Source: LanguageTool (HOW_DOES_THIS_CHANGES)
 * Category: grammar
 */
export const howDoesThisChangesRule: GrammarRule = {
  id: 'how-does-this-changes',
  name: 'how does this changes (change)',
  description: 'It seems that the verb form is incorrect.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhow|what|when|where|who|why|which\b\s+\S+\s+\bdoes|did\b\s+\bthis|that|it|s?he|they|we|you\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It seems that the verb form is incorrect.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
