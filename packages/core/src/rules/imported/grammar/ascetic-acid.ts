import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Ascetic acid v acetic acid
 * 
 * Source: LanguageTool (ASCETIC_ACID)
 * Category: grammar
 */
export const asceticAcidRule: GrammarRule = {
  id: 'ascetic-acid',
  name: 'Ascetic acid v acetic acid',
  description: 'Did you mean acetic acid?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bascetic\b\s+\bacid\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean acetic acid?',
        suggestions: ["acetic acid"],
      });
    }
    
    return issues;
  },
};
