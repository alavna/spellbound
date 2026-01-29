import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * dons't (don't)
 * 
 * Source: LanguageTool (DONS_T)
 * Category: grammar
 */
export const donsTRule: GrammarRule = {
  id: 'dons-t',
  name: 'dons\'t (don\'t)',
  description: 'Typo detected. Did you mean don\'t (= verb)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdons\b\s+&apostrophe;\s+\bt\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Typo detected. Did you mean don\'t (= verb)?',
        suggestions: ["don't"],
      });
    }
    
    return issues;
  },
};
