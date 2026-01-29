import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * another words (in other words)
 * 
 * Source: LanguageTool (ANOTHER_WORDS)
 * Category: grammar
 */
export const anotherWordsRule: GrammarRule = {
  id: 'another-words',
  name: 'another words (in other words)',
  description: 'Did you mean in other words?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\banother\b\s+\bwords\b\s+,/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean in other words?',
        suggestions: ["in other words"],
      });
    }
    
    return issues;
  },
};
