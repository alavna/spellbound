import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * bitter in taste (bitter)
 * 
 * Source: LanguageTool (BITTER_IN_TASTE)
 * Category: style
 */
export const bitterInTasteRule: GrammarRule = {
  id: 'bitter-in-taste',
  name: 'bitter in taste (bitter)',
  description: 'Consider using \\1.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbitter\b\s+\bin\b\s+\btaste\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using \\1.',
        suggestions: ["\\1"],
      });
    }
    
    return issues;
  },
};
