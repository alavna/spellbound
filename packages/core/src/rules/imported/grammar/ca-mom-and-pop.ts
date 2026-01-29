import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Compound adjective: mom and pop
 * 
 * Source: LanguageTool (CA_MOM_AND_POP)
 * Category: grammar
 */
export const caMomAndPopRule: GrammarRule = {
  id: 'ca-mom-and-pop',
  name: 'Compound adjective: mom and pop',
  description: '\'\\1 \\2 \\3\' seems to be a compound adjective before a noun. Use a hyphen: \\1-\\2-\\3.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmom\b\s+\band\b\s+\bpop\b\s+\S+/gi;
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
