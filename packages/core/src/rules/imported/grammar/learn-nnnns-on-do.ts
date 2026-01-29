import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * wrong preposition: 'learn sth on do' (to do)
 * 
 * Source: LanguageTool (LEARN_NNNNS_ON_DO)
 * Category: grammar
 */
export const learnNnnnsOnDoRule: GrammarRule = {
  id: 'learn-nnnns-on-do',
  name: 'wrong preposition: \'learn sth on do\' (to do)',
  description: 'Did you mean to?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\blearn\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean to?',
        suggestions: ["to"],
      });
    }
    
    return issues;
  },
};
