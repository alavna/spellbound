import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * key words (keywords)
 * 
 * Source: LanguageTool (KEY_WORDS)
 * Category: grammar
 */
export const keyWordsRule: GrammarRule = {
  id: 'key-words',
  name: 'key words (keywords)',
  description: 'Did you mean keywords?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bkey\b\s+\bwords\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean keywords?',
        suggestions: ["keywords"],
      });
    }
    
    return issues;
  },
};
