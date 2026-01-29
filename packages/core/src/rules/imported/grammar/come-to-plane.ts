import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * came to/by
 * 
 * Source: LanguageTool (COME_TO_PLANE)
 * Category: grammar
 */
export const comeToPlaneRule: GrammarRule = {
  id: 'come-to-plane',
  name: 'came to/by',
  description: 'The usual collocation for \"\\2\" is \"by\".',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\byes\b\s+\bto\b\s+\bplane|train|bus|car|metro|subway|airplane|bike|motorcycle\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The usual collocation for \"\\2\" is \"by\".',
        suggestions: ["\\1 \\2 by \\4"],
      });
    }
    
    return issues;
  },
};
