import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Axed v asked
 * 
 * Source: LanguageTool (AXED_ASKED)
 * Category: grammar
 */
export const axedAskedRule: GrammarRule = {
  id: 'axed-asked',
  name: 'Axed v asked',
  description: 'Did you mean asked?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\baxed\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean asked?',
        suggestions: ["asked"],
      });
    }
    
    return issues;
  },
};
