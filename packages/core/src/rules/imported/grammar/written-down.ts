import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * It's a blog where the author has penned-down (penned down) his experiences
 * 
 * Source: LanguageTool (WRITTEN_DOWN)
 * Category: grammar
 */
export const writtenDownRule: GrammarRule = {
  id: 'written-down',
  name: 'It\'s a blog where the author has penned-down (penned down) his experiences',
  description: 'These words are not typically hyphenated.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /(jot(s|ting|ted)?|not(es?|ing|ed)?|pen(s|ning|ned)?|writ(es|ing|ten)?|wrote)-down\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'These words are not typically hyphenated.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
