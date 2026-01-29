import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * therapeutic treatment (treatment)
 * 
 * Source: LanguageTool (THERAPEUTIC_TREATMENT)
 * Category: style
 */
export const therapeuticTreatmentRule: GrammarRule = {
  id: 'therapeutic-treatment',
  name: 'therapeutic treatment (treatment)',
  description: 'Consider using \\2.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\btherapeutic\b\s+\btreatment\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using \\2.',
        suggestions: ["\\2"],
      });
    }
    
    return issues;
  },
};
