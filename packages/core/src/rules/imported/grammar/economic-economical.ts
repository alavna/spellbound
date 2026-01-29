import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 'economic (economical) car' etc.
 * 
 * Source: LanguageTool (ECONOMIC_ECONOMICAL)
 * Category: grammar
 */
export const economicEconomicalRule: GrammarRule = {
  id: 'economic-economical',
  name: '\'economic (economical) car\' etc.',
  description: 'Did you mean economical (=affordable, cheap)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\beconomic\b\s+\bway|use|repair|means|methods|method|price|proposition|manner|basis|car|cooking|design|heating|motoring|shopper\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean economical (=affordable, cheap)?',
        suggestions: ["economical"],
      });
    }
    
    return issues;
  },
};
