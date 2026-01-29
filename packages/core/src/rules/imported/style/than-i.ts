import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * be bigger than me (I)
 * 
 * Source: LanguageTool (THAN_I)
 * Category: style
 */
export const thanIRule: GrammarRule = {
  id: 'than-i',
  name: 'be bigger than me (I)',
  description: 'In formal / written English, it is recommended that you use a subject pronoun.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\S+\s+\bthan\b\s+\bme|him|her|us|them\b\s+\bby|at|in|[.!?]/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'In formal / written English, it is recommended that you use a subject pronoun.',
        suggestions: ["I","he","she","we","they"],
      });
    }
    
    return issues;
  },
};
