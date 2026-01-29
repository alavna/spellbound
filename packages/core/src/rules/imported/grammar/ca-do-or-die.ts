import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Compound adjective: do or die
 * 
 * Source: LanguageTool (CA_DO_OR_DIE)
 * Category: grammar
 */
export const caDoOrDieRule: GrammarRule = {
  id: 'ca-do-or-die',
  name: 'Compound adjective: do or die',
  description: '\'\\1 \\2 \\3\' seems to be a compound adjective before a noun. Use a hyphen: \\1-\\2-\\3.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdo\b\s+\bor\b\s+\bdie\b/gi;
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
