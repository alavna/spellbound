import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I'm beginning to adding (add)
 * 
 * Source: LanguageTool (BEGINNING_TO_ADDING_BROAD)
 * Category: grammar
 */
export const beginningToAddingBroadRule: GrammarRule = {
  id: 'beginning-to-adding-broad',
  name: 'I\'m beginning to adding (add)',
  description: 'Did you mean to ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\S+\s+\bto\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean to ?',
        suggestions: ["to"],
      });
    }
    
    return issues;
  },
};
