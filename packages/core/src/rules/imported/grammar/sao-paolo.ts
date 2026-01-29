import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Sau Paulo (São Paulo)
 * 
 * Source: LanguageTool (SAO_PAOLO)
 * Category: grammar
 */
export const saoPaoloRule: GrammarRule = {
  id: 'sao-paolo',
  name: 'Sau Paulo (São Paulo)',
  description: 'Did you mean São Paulo (= city in Brazil)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bS[áãàa][ou]\s+\bPa[ou]l[uo]/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean São Paulo (= city in Brazil)?',
        suggestions: ["São Paulo"],
      });
    }
    
    return issues;
  },
};
