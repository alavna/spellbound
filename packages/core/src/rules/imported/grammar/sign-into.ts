import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * wrong preposition: sign into (sign in to)
 * 
 * Source: LanguageTool (SIGN_INTO)
 * Category: grammar
 */
export const signIntoRule: GrammarRule = {
  id: 'sign-into',
  name: 'wrong preposition: sign into (sign in to)',
  description: 'The verb \'\\1 \\2\' is not standard English, except in the context of the law (\"The bill was signed into law\"). Write \\1 in to. For websites and computers, other options are log in to or log on to.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\binto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The verb \'\\1 \\2\' is not standard English, except in the context of the law (\"The bill was signed into law\"). Write \\1 in to. For websites and computers, other options are log in to or log on to.',
        suggestions: ["\\1 in to","log in to","log on to"],
      });
    }
    
    return issues;
  },
};
