import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * they havn't (haven't)
 * 
 * Source: LanguageTool (HAVNT)
 * Category: grammar
 */
export const havntRule: GrammarRule = {
  id: 'havnt',
  name: 'they havn\'t (haven\'t)',
  description: 'Typo detected. Did you mean haven\\2t?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhav[ia]?n\b\s+&apostrophe;\s+\bt\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Typo detected. Did you mean haven\\2t?',
        suggestions: ["haven\\2t"],
      });
    }
    
    return issues;
  },
};
