import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Compound adjective: down and out
 * 
 * Source: LanguageTool (CA_DOWN_AND_OUT)
 * Category: grammar
 */
export const caDownAndOutRule: GrammarRule = {
  id: 'ca-down-and-out',
  name: 'Compound adjective: down and out',
  description: '\'\\1 \\2 \\3\' seems to be a compound adjective before a noun. Use a hyphen: \\1-\\2-\\3.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdown\b\s+\band\b\s+\bout\b\s+\S+/gi;
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
