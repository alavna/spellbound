import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I ill (I will)
 * 
 * Source: LanguageTool (I_ILL)
 * Category: grammar
 */
export const iIllRule: GrammarRule = {
  id: 'i-ill',
  name: 'I ill (I will)',
  description: 'Did you mean will \\3 or is a hyphen missing ill-\\3 (e.g., ill-treated, ill-advised)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bill\b\s+[a-z].*/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean will \\3 or is a hyphen missing ill-\\3 (e.g., ill-treated, ill-advised)?',
        suggestions: ["will \\3","ill-\\3"],
      });
    }
    
    return issues;
  },
};
