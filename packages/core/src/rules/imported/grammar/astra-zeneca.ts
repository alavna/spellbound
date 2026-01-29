import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * AstraZeneca
 * 
 * Source: LanguageTool (ASTRA_ZENECA)
 * Category: grammar
 */
export const astraZenecaRule: GrammarRule = {
  id: 'astra-zeneca',
  name: 'AstraZeneca',
  description: 'The pharma company AstraZeneca is spelled without a space in between.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bastra\b\s+\bzeneca\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The pharma company AstraZeneca is spelled without a space in between.',
        suggestions: ["AstraZeneca"],
      });
    }
    
    return issues;
  },
};
