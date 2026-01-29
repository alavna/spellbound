import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * prorata -> pro rata
 * 
 * Source: LanguageTool (PRO_RATA)
 * Category: grammar
 */
export const proRataRule: GrammarRule = {
  id: 'pro-rata',
  name: 'prorata -> pro rata',
  description: 'The Latin adjective/adverb pro is spelled as two words.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bpro-?(rata|bono|forma)/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The Latin adjective/adverb pro is spelled as two words.',
        suggestions: ["pro"],
      });
    }
    
    return issues;
  },
};
