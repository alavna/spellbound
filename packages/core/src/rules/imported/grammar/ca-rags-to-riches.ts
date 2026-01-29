import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Compound adjective: rags to riches
 * 
 * Source: LanguageTool (CA_RAGS_TO_RICHES)
 * Category: grammar
 */
export const caRagsToRichesRule: GrammarRule = {
  id: 'ca-rags-to-riches',
  name: 'Compound adjective: rags to riches',
  description: '\'\\1 \\2 \\3\' seems to be a compound adjective before a noun. Use a hyphen: \\1-\\2-\\3.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\brags\b\s+\bto\b\s+\briches\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\'\\1 \\2 \\3\' seems to be a compound adjective before a noun. Use a hyphen: \\1-\\2-\\3.',
        suggestions: ["\\1-\\2-\\3"],
      });
    }
    
    return issues;
  },
};
