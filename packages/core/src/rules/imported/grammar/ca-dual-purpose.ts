import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Compound adjective: dual purpose
 * 
 * Source: LanguageTool (CA_DUAL_PURPOSE)
 * Category: grammar
 */
export const caDualPurposeRule: GrammarRule = {
  id: 'ca-dual-purpose',
  name: 'Compound adjective: dual purpose',
  description: '\'\\1 \\2\' seems to be a compound adjective before a noun. Use a hyphen: \\1-\\2.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdual\b\s+\bpurpose\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\'\\1 \\2\' seems to be a compound adjective before a noun. Use a hyphen: \\1-\\2.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
