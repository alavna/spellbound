import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * pawn off (palm off)
 * 
 * Source: LanguageTool (PAWN_OFF)
 * Category: grammar
 */
export const pawnOffRule: GrammarRule = {
  id: 'pawn-off',
  name: 'pawn off (palm off)',
  description: 'Did you mean palm off?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bpawn\b\s+\boff\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean palm off?',
        suggestions: ["palm off"],
      });
    }
    
    return issues;
  },
};
