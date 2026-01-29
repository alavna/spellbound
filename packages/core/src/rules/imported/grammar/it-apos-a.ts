import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * it'a (it's)
 * 
 * Source: LanguageTool (IT_APOS_A)
 * Category: grammar
 */
export const itAposARule: GrammarRule = {
  id: 'it-apos-a',
  name: 'it\'a (it\'s)',
  description: 'Did you mean \\1\\2s?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhe|she|it\b\s+&apostrophe;\s+[qway]/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1\\2s?',
        suggestions: ["\\1\\2s"],
      });
    }
    
    return issues;
  },
};
