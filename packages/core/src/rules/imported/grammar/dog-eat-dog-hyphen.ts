import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * dog-eat-dog
 * 
 * Source: LanguageTool (DOG_EAT_DOG_HYPHEN)
 * Category: grammar
 */
export const dogEatDogHyphenRule: GrammarRule = {
  id: 'dog-eat-dog-hyphen',
  name: 'dog-eat-dog',
  description: 'The adjective phrase \\1-\\2-\\3 is spelled with a hyphen when it modifies a noun.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdog\b\s+\beat\b\s+\bdog\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The adjective phrase \\1-\\2-\\3 is spelled with a hyphen when it modifies a noun.',
        suggestions: ["\\1-\\2-\\3"],
      });
    }
    
    return issues;
  },
};
