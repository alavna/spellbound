import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Harison (Harrison) Ford
 * 
 * Source: LanguageTool (HARRISON_FORD)
 * Category: grammar
 */
export const harrisonFordRule: GrammarRule = {
  id: 'harrison-ford',
  name: 'Harison (Harrison) Ford',
  description: 'Did you mean the American actor and film producer Harrison Ford?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bHarison\b\s+\bFord\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the American actor and film producer Harrison Ford?',
        suggestions: ["Harrison Ford"],
      });
    }
    
    return issues;
  },
};
