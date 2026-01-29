import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * would never done (have done)
 * 
 * Source: LanguageTool (WOULD_NEVER_VBN)
 * Category: grammar
 */
export const wouldNeverVbnRule: GrammarRule = {
  id: 'would-never-vbn',
  name: 'would never done (have done)',
  description: 'Did you mean \\1 \\2 have \\3?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /(c|w|sh)ould\b\s+\bnever\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1 \\2 have \\3?',
        suggestions: ["\\1 \\2 have \\3"],
      });
    }
    
    return issues;
  },
};
