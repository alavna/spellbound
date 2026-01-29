import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * doggy-dog (dog-eat-dog)
 * 
 * Source: LanguageTool (DOG-EAT-DOG)
 * Category: grammar
 */
export const dogEatDogRule: GrammarRule = {
  id: 'dog-eat-dog',
  name: 'doggy-dog (dog-eat-dog)',
  description: 'Did you mean dog-eat-dog?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdoggy-dog\b\s+\bworld\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean dog-eat-dog?',
        suggestions: ["dog-eat-dog"],
      });
    }
    
    return issues;
  },
};
