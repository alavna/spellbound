import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Awaiting for - incorrect
 * 
 * Source: LanguageTool (AWAITING_FOR)
 * Category: grammar
 */
export const awaitingForRule: GrammarRule = {
  id: 'awaiting-for',
  name: 'Awaiting for - incorrect',
  description: 'Did you mean awaiting or waiting for?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bawaiting\b\s+\bfor\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean awaiting or waiting for?',
        suggestions: ["awaiting","waiting for"],
      });
    }
    
    return issues;
  },
};
