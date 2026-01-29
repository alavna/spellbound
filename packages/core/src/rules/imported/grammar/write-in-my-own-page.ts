import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Write on my page
 * 
 * Source: LanguageTool (WRITE_IN_MY_OWN_PAGE)
 * Category: grammar
 */
export const writeInMyOwnPageRule: GrammarRule = {
  id: 'write-in-my-own-page',
  name: 'Write on my page',
  description: 'The usual collocation for \"\\1\" is \"on\". Did you mean \\1 on ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bin\b\s+\S+\s+\bown\b\s+(?:page|blog|webpage|wall)s?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The usual collocation for \"\\1\" is \"on\". Did you mean \\1 on ?',
        suggestions: ["\\1 on"],
      });
    }
    
    return issues;
  },
};
