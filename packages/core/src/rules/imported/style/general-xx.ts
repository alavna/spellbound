import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * general public (public)
 * 
 * Source: LanguageTool (GENERAL_XX)
 * Category: style
 */
export const generalXxRule: GrammarRule = {
  id: 'general-xx',
  name: 'general public (public)',
  description: 'Consider using only \\2 to avoid wordiness.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bgeneral\b\s+\bpublic|consensus\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using only \\2 to avoid wordiness.',
        suggestions: ["\\2"],
      });
    }
    
    return issues;
  },
};
