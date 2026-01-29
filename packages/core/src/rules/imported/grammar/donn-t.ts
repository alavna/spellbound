import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * donn't → don't
 * 
 * Source: LanguageTool (DONN_T)
 * Category: grammar
 */
export const donnTRule: GrammarRule = {
  id: 'donn-t',
  name: 'donn\'t → don\'t',
  description: 'Typo detected. Did you mean don\\2\\3?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdonn\b\s+&apostrophe;\s+\bt\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Typo detected. Did you mean don\\2\\3?',
        suggestions: ["don\\2\\3"],
      });
    }
    
    return issues;
  },
};
