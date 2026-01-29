import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * be + adverb + be
 * 
 * Source: LanguageTool (BE_RB_BE)
 * Category: grammar
 */
export const beRbBeRule: GrammarRule = {
  id: 'be-rb-be',
  name: 'be + adverb + be',
  description: 'The grammar seems incorrect. Please check.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\breally|very|totally|maybe|however|absolutely|also|often|usually|too|never|always|sometimes|likely|simply|generally\b\s+\bis|was|were|are\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The grammar seems incorrect. Please check.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
