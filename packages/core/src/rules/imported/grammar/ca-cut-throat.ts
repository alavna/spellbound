import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Compound adjective: cut throat
 * 
 * Source: LanguageTool (CA_CUT_THROAT)
 * Category: grammar
 */
export const caCutThroatRule: GrammarRule = {
  id: 'ca-cut-throat',
  name: 'Compound adjective: cut throat',
  description: '\'\\1 \\2\' seems to be a compound adjective before a noun. Use a hyphen: \\1-\\2.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcut\b\s+\bthroat\b\s+\S+/gi;
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
