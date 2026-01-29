import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * This is has (has/is)
 * 
 * Source: LanguageTool (THIS_IS_HAVE)
 * Category: grammar
 */
export const thisIsHaveRule: GrammarRule = {
  id: 'this-is-have',
  name: 'This is has (has/is)',
  description: 'It appears that only one verb is needed.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bs?he|it|this|that|you|we|they\b\s+\bis|was|were|are\b\s+\bhave|has|had|do|did|can|will|would|should\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that only one verb is needed.',
        suggestions: ["\\3","\\4"],
      });
    }
    
    return issues;
  },
};
