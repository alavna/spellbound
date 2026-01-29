import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Compound adjective: coast to coast
 * 
 * Source: LanguageTool (CA_COAST_TO_COAST)
 * Category: grammar
 */
export const caCoastToCoastRule: GrammarRule = {
  id: 'ca-coast-to-coast',
  name: 'Compound adjective: coast to coast',
  description: '\'\\1 \\2 \\3\' seems to be a compound adjective before a noun. Use a hyphen: \\1-\\2-\\3.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcoast\b\s+\bto\b\s+\bcoast\b\s+\S+/gi;
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
