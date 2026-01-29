import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Compound adjective: cut and paste
 * 
 * Source: LanguageTool (CA_CUT_AND_PASTE)
 * Category: grammar
 */
export const caCutAndPasteRule: GrammarRule = {
  id: 'ca-cut-and-paste',
  name: 'Compound adjective: cut and paste',
  description: '\'\\1 \\2 \\3\' seems to be a compound adjective before a noun. Use a hyphen: \\1-\\2-\\3.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcut\b\s+\band\b\s+\bpaste\b\s+\S+/gi;
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
