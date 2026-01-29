import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Aide in wrong context
 * 
 * Source: LanguageTool (TO_AIDE)
 * Category: grammar
 */
export const toAideRule: GrammarRule = {
  id: 'to-aide',
  name: 'Aide in wrong context',
  description: 'Did you mean to aid?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bto\b\s+\baide\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean to aid?',
        suggestions: ["to aid"],
      });
    }
    
    return issues;
  },
};
