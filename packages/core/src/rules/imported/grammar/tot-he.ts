import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * tot he (to the)
 * 
 * Source: LanguageTool (TOT_HE)
 * Category: grammar
 */
export const totHeRule: GrammarRule = {
  id: 'tot-he',
  name: 'tot he (to the)',
  description: 'Did you mean to the?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\btot\b\s+\bhe\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean to the?',
        suggestions: ["to the"],
      });
    }
    
    return issues;
  },
};
