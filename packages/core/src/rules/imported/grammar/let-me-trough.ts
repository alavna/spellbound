import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Let me trough (through)!
 * 
 * Source: LanguageTool (LET_ME_TROUGH)
 * Category: grammar
 */
export const letMeTroughRule: GrammarRule = {
  id: 'let-me-trough',
  name: 'Let me trough (through)!',
  description: 'Did you mean through?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bhim|us|'s|me|her|them|it|you\b\s+\btrough|though\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean through?',
        suggestions: ["through"],
      });
    }
    
    return issues;
  },
};
