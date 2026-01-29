import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Th (The/thorium)
 * 
 * Source: LanguageTool (TH_THORIUM)
 * Category: grammar
 */
export const thThoriumRule: GrammarRule = {
  id: 'th-thorium',
  name: 'Th (The/thorium)',
  description: 'Make sure that \'Th\' is the chemical symbol for thorium, and not a typing error. Did you mean The?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bTh\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Make sure that \'Th\' is the chemical symbol for thorium, and not a typing error. Did you mean The?',
        suggestions: ["The"],
      });
    }
    
    return issues;
  },
};
