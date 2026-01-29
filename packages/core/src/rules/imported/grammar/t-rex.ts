import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * T-rex (T. rex)
 * 
 * Source: LanguageTool (T_REX)
 * Category: grammar
 */
export const tRexRule: GrammarRule = {
  id: 't-rex',
  name: 'T-rex (T. rex)',
  description: 'The official abbreviation for \"Tyrannosaurus rex\" is T. rex.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bt-rex\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The official abbreviation for \"Tyrannosaurus rex\" is T. rex.',
        suggestions: ["T. rex"],
      });
    }
    
    return issues;
  },
};
