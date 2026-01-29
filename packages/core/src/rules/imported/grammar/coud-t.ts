import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * oud't, oudn't, ould't → ouldn't
 * 
 * Source: LanguageTool (COUD_T)
 * Category: grammar
 */
export const coudTRule: GrammarRule = {
  id: 'coud-t',
  name: 'oud\'t, oudn\'t, ould\'t → ouldn\'t',
  description: 'Typo detected. Did you mean \\2\\3?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /&apostrophe;\s+\bt\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Typo detected. Did you mean \\2\\3?',
        suggestions: ["\\2\\3"],
      });
    }
    
    return issues;
  },
};
