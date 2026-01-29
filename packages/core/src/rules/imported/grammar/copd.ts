import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * C.O.P.D (COPD)
 * 
 * Source: LanguageTool (COPD)
 * Category: grammar
 */
export const copdRule: GrammarRule = {
  id: 'copd',
  name: 'C.O.P.D (COPD)',
  description: 'Are you referring to chronic obstructive pulmonary disease (COPD)? The acronym does not contain punctuation.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bC\b\s+\.\s+\bO\b\s+\.\s+\bP\b\s+\.\s+\bD\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Are you referring to chronic obstructive pulmonary disease (COPD)? The acronym does not contain punctuation.',
        suggestions: ["COPD"],
      });
    }
    
    return issues;
  },
};
