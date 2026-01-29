import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Compound adjective: hand to hand
 * 
 * Source: LanguageTool (CA_HAND_TO_HAND)
 * Category: grammar
 */
export const caHandToHandRule: GrammarRule = {
  id: 'ca-hand-to-hand',
  name: 'Compound adjective: hand to hand',
  description: '\'\\1 \\2 \\3\' seems to be a compound adjective before a noun. Use a hyphen: \\1-\\2-\\3.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhand\b\s+\bto\b\s+\bhand\b\s+\S+/gi;
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
