import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Collocation: lot (of)
 * 
 * Source: LanguageTool (LOT_OF)
 * Category: grammar
 */
export const lotOfRule: GrammarRule = {
  id: 'lot-of',
  name: 'Collocation: lot (of)',
  description: 'If you mean a great quantity, use \\1 \\2 of \\3.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ba\b\s+\blots\.\.handful\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'If you mean a great quantity, use \\1 \\2 of \\3.',
        suggestions: ["\\1 \\2 of \\3"],
      });
    }
    
    return issues;
  },
};
