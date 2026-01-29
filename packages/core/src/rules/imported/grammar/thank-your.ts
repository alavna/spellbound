import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * thank your (you)
 * 
 * Source: LanguageTool (THANK_YOUR)
 * Category: grammar
 */
export const thankYourRule: GrammarRule = {
  id: 'thank-your',
  name: 'thank your (you)',
  description: 'Did you mean \\1 ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthank\b\s+\byour\b\s+[!.]/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1 ?',
        suggestions: ["\\1"],
      });
    }
    
    return issues;
  },
};
