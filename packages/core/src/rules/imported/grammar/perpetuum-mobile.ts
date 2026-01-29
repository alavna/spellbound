import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * perpetuum mobile
 * 
 * Source: LanguageTool (PERPETUUM_MOBILE)
 * Category: grammar
 */
export const perpetuumMobileRule: GrammarRule = {
  id: 'perpetuum-mobile',
  name: 'perpetuum mobile',
  description: 'Did you mean the Latin phrase perpetuum mobile?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bp[aei]rp[aei]t(ue?|eu)m\b\s+\bmobil[eèé]?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the Latin phrase perpetuum mobile?',
        suggestions: ["perpetuum mobile"],
      });
    }
    
    return issues;
  },
};
