import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Possessive pronoun with apostrophe
 * 
 * Source: LanguageTool (YOURS_APOSTROPHE)
 * Category: grammar
 */
export const yoursApostropheRule: GrammarRule = {
  id: 'yours-apostrophe',
  name: 'Possessive pronoun with apostrophe',
  description: 'An apostrophe is never used to form possessive case pronouns. Did you mean: \\2?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /.*s\b\s+&apostrophe;/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'An apostrophe is never used to form possessive case pronouns. Did you mean: \\2?',
        suggestions: ["\\2"],
      });
    }
    
    return issues;
  },
};
