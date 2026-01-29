import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * fee vs free
 * 
 * Source: LanguageTool (FEE_FREE)
 * Category: grammar
 */
export const feeFreeRule: GrammarRule = {
  id: 'fee-free',
  name: 'fee vs free',
  description: 'Did you mean free?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bfee\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean free?',
        suggestions: ["free"],
      });
    }
    
    return issues;
  },
};
