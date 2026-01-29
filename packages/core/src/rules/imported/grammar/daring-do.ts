import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * daring-do (derring-do)
 * 
 * Source: LanguageTool (DARING-DO)
 * Category: grammar
 */
export const daringDoRule: GrammarRule = {
  id: 'daring-do',
  name: 'daring-do (derring-do)',
  description: 'Did you mean derring-do?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdaring-do\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean derring-do?',
        suggestions: ["derring-do"],
      });
    }
    
    return issues;
  },
};
