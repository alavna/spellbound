import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Compound adjective: out of body
 * 
 * Source: LanguageTool (CA_OUT_OF_BODY)
 * Category: grammar
 */
export const caOutOfBodyRule: GrammarRule = {
  id: 'ca-out-of-body',
  name: 'Compound adjective: out of body',
  description: '\'\\1 \\2 \\3\' seems to be a compound adjective before a noun. Use a hyphen: \\1-\\2-\\3.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bout\b\s+\bof\b\s+\bbody\b\s+\S+/gi;
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
