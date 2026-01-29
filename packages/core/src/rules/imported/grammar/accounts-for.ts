import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * account (for)
 * 
 * Source: LanguageTool (ACCOUNTS_FOR)
 * Category: grammar
 */
export const accountsForRule: GrammarRule = {
  id: 'accounts-for',
  name: 'account (for)',
  description: 'The verb \"account\" is usually followed by \"for\".',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthat|which\b\s+\byes\b\s+\ban?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The verb \"account\" is usually followed by \"for\".',
        suggestions: ["\\1 \\2 for"],
      });
    }
    
    return issues;
  },
};
